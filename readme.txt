Fildem - install from this repository
===================================

Fildem has two parts:
  1) A GNOME Shell extension: fildemGMenu@gonza.com
  2) A Python program that provides: fildem, fildem-hud


1) Get the source
-----------------

Clone (or use your existing checkout):

  git clone https://github.com/gonzaarcr/Fildem.git
  cd Fildem


2) Install system dependencies
------------------------------

Ubuntu/Debian (runtime deps used by the .deb packaging):

  sudo apt update
  sudo apt install \
    appmenu-gtk2-module appmenu-gtk3-module unity-gtk-module-common \
    bamfdaemon libbamf3-dev libkeybinder-3.0-dev \
    python3-gi python3-pip

Arch (runtime deps used by the PKGBUILD):

  sudo pacman -S --needed bamf appmenu-gtk-module libkeybinder3 libdbusmenu-gtk3 python-pip


3) Install the Python package
-----------------------------

User install (recommended for local testing):

  python3 -m pip install --user .

System install:

  sudo python3 -m pip install .

After a user install, ensure ~/.local/bin is on PATH so the `fildem` commands are found.


4) Install the GNOME Shell extension from this repo
---------------------------------------------------

  mkdir -p ~/.local/share/gnome-shell/extensions
  cp -r fildemGMenu@gonza.com ~/.local/share/gnome-shell/extensions/
  glib-compile-schemas ~/.local/share/gnome-shell/extensions/fildemGMenu@gonza.com/schemas

Restart GNOME Shell:
  - Xorg: Alt+F2, type "r", press Enter
  - Wayland: log out and log back in

Enable the extension (either via Extensions app), or CLI:

  gnome-extensions enable fildemGMenu@gonza.com


5) Configure GTK modules (required)
-----------------------------------

Create ~/.gtkrc-2.0 and append:

  gtk-modules="appmenu-gtk-module"

Ensure ~/.config/gtk-3.0/settings.ini contains:

  [Settings]
  gtk-modules="appmenu-gtk-module"


6) Run
------

Start the global menu service:

  fildem

HUD:

  fildem-hud


Optional: build and install a .deb from the repo
-----------------------------------------------

  make build
  sudo apt install ./fildem_*.deb

Clean build artifacts:

  make clean
