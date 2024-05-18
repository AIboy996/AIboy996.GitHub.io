from setuptools import find_packages, setup

setup(
    name='local-mkdocs-plugin',
    packages=find_packages(),
    include_package_data=True,
    entry_points={
        'mkdocs.plugins': [
            'group = local_plugins.group_plugin:GroupPlugin'
        ]
    }
)
