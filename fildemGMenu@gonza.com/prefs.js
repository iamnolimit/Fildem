import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class FildemGMenuPreferences extends ExtensionPreferences {
	fillPreferencesWindow(window) {
		Adw.init();

		const settings = this.getSettings();

		window.set_default_size(500, 250);

		const page = new Adw.PreferencesPage();
		const group = new Adw.PreferencesGroup();
		page.add(group);

		const paddingAdjustment = new Gtk.Adjustment({
			lower: 0,
			upper: 50,
			step_increment: 1,
			page_increment: 1,
		});
		const paddingSpin = new Gtk.SpinButton({
			adjustment: paddingAdjustment,
			valign: Gtk.Align.CENTER,
		});
		settings.bind('min-padding', paddingSpin, 'value', Gio.SettingsBindFlags.DEFAULT);

		const paddingRow = new Adw.ActionRow({
			title: 'Button paddings',
			subtitle: 'Tweak this if the menu and items desynchronize',
		});
		paddingRow.add_suffix(paddingSpin);
		paddingRow.activatable_widget = paddingSpin;
		group.add(paddingRow);

		const hoverSwitch = new Gtk.Switch({valign: Gtk.Align.CENTER});
		settings.bind('show-only-when-hover', hoverSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
		const hoverRow = new Adw.ActionRow({
			title: 'Show menu only when the mouse is over the panel',
		});
		hoverRow.add_suffix(hoverSwitch);
		hoverRow.activatable_widget = hoverSwitch;
		group.add(hoverRow);

		const hideSwitch = new Gtk.Switch({valign: Gtk.Align.CENTER});
		settings.bind('hide-app-menu', hideSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
		const hideRow = new Adw.ActionRow({
			title: 'Hide the app label when showing the menu',
		});
		hideRow.add_suffix(hideSwitch);
		hideRow.activatable_widget = hideSwitch;
		group.add(hideRow);

		window.add(page);
	}
}
