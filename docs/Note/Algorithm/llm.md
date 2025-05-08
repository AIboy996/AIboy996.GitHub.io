---
tags:
- Alg
- Papers
---

# Large Language Models

## Build LLM from scratch

### Dataset

数据收集之后需要做filtering

### Tokenizing

[Byte_pair编码](https://en.wikipedia.org/wiki/Byte_pair_encoding)

subword tokenization: 避免词汇爆炸

special tokens:

- UNK（unknown）
- BOS（begin of sequence）
- EOS（end of sequence）

### Embedding

word embedding: word2vec

position embedding: Fixed or Learnable

RoPE?

### Transformer

Sequence modeling
Easily parallelizable
Finite context window

### Pretrain

Autoregressive or Mask(bi-directional)

Chunking

Metric?

- CE
- Byte-Per-Character / Byte-per-word
- perplexity（困惑度）

Precision??

FP16 FP32 BF16 ==> torch.amp

### MoE


### SFT

Instruction-Tuning

Special Tokens

PEFT

### RL

RLHF

Actor-critic method

PPO

DPO

GRPO

### Reasoning

process-based reward model (PRM)

    - Best-of-N
    - Beam Search
    - Lookahead search

TBD:llm