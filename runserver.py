#! ./venv/Scripts/python.exe

"""run mkdocs server in localhost"""

import os

if __name__ =="__main__":
    # allow all ip to access
    # --dirtyreload:
    # Enable the live reloading in the development server, but only re-build files that have changed
    os.system('mkdocs serve')