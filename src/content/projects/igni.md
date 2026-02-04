---
title: IGNI
subtitle: Witcher 1 to Unreal Engine asset bridge
link: https://www.google.com/
from: 2022-12-01
technologies:
    - Unreal Engine 5
    - Python
    - kaitai
prio: 0
---

IGNI (the name is inspired by one of the Witcher's magic signs) is a console application and a set of Python scripts for Unreal Engine Python environment that allow to bring various game assets from the Witcher 1 game into Unreal Engine 5. The console app is responsible for game asset conversion (for example, game binary -> `fbx`). Python utility scripts for Unreal are aimed to simplify import of the converted assets. I used kaitai to read the game binaries with readable declarative schemas instead of authoring parser code. Due to its use of multiple processes, the application can transport entire game models within minutes.