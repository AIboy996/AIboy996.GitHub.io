"""Protect $...$ / $$...$$ math from Python-Markdown's inline processing.

The site renders math with MathJax directly (no pymdownx.arithmatex).  This
hook registers a tiny Markdown extension that stashes math spans before
Markdown's emphasis/escape processors see them.  MathJax still receives the
original delimiters, so nothing about the rendering pipeline changes.

Existing source conventions keep working: inside math, backslash escapes are
applied the same way Python-Markdown would apply them, so ``\\\\`` still turns
into a TeX line break and ``\\{`` still turns into a literal brace.
"""
import re
import xml.etree.ElementTree as etree

from markdown import Extension, util
from markdown.blockprocessors import BlockProcessor
from markdown.inlinepatterns import InlineProcessor


# Smart-dollar inline math: opening $ not followed by whitespace, closing $
# not preceded by whitespace, and neither escaped by a backslash.
RE_INLINE = r'(?<!\\)\$(?!\s)((?:\\.|[^\\$])+?)(?<!\s)(?<!\\)\$'
# Display math may start/end with whitespace or newlines.
RE_DISPLAY_INLINE = r'(?<!\\)\$\$((?:\\.|[^\\])+?)(?<!\\)\$\$'
RE_DISPLAY_BLOCK = r'(?s)^\$\$(.*?)\$\$\s*$'


# Set by on_page_markdown; only pages that actually load MathJax need shielding.
_MATH_PAGE = False


def _unescape(text, escaped_chars):
    """Apply the same backslash escapes Python-Markdown would apply."""
    return re.sub(
        r'\\(.)',
        lambda m: m.group(1) if m.group(1) in escaped_chars else m.group(0),
        text,
    )


class MathInline(InlineProcessor):
    def handleMatch(self, m, data):
        if not _MATH_PAGE:
            return None, m.start(0), m.end(0)
        math = _unescape(m.group(0), self.md.ESCAPED_CHARS)
        # AtomicString tells Markdown not to run emphasis/link/etc. on it.
        return util.AtomicString(math), m.start(0), m.end(0)


class MathBlock(BlockProcessor):
    def test(self, parent, block):
        return _MATH_PAGE and re.match(RE_DISPLAY_BLOCK, block) is not None

    def run(self, parent, blocks):
        block = blocks.pop(0)
        m = re.match(RE_DISPLAY_BLOCK, block)
        # A normal string, so the inline processor protects it next.
        p = etree.SubElement(parent, 'p')
        p.text = '$$' + m.group(1) + '$$'
        return True


class MathProtectExtension(Extension):
    def extendMarkdown(self, md):
        # 190 = backtick/code span, 180 = escape, 60/50 = emphasis.
        md.inlinePatterns.register(
            MathInline(RE_DISPLAY_INLINE, md), 'math-display-inline', 189.95
        )
        md.inlinePatterns.register(
            MathInline(RE_INLINE, md), 'math-inline', 189.9
        )
        md.parser.blockprocessors.register(
            MathBlock(md.parser), 'math-block', 79.8
        )


def on_config(config):
    """Register the extension without requiring it to be importable."""
    if not any(isinstance(ext, MathProtectExtension) for ext in config.markdown_extensions):
        config.markdown_extensions.append(MathProtectExtension())


def on_page_markdown(markdown, page, config, files):
    """Only shield pages that opt into MathJax via ``include: math``."""
    global _MATH_PAGE
    includes = page.meta.get('include') or []
    if isinstance(includes, str):
        includes = [includes]
    _MATH_PAGE = 'math' in includes
    return markdown
