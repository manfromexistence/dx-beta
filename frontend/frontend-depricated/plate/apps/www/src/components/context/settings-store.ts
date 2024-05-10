'use client';

import { KEY_SINGLE_LINE } from '@udecode/plate-break';
import { createZustandStore } from '@udecode/plate-common';
import { KEY_NORMALIZE_TYPES } from '@udecode/plate-normalizers';
import { KEY_SELECT_ON_BACKSPACE } from '@udecode/plate-select';
import { toast } from 'sonner';

import { customizerItems, SettingPlugin } from '@/config/customizer-items';
import { customizerList } from '@/config/customizer-list';
import { customizerPlugins, ValueId } from '@/config/customizer-plugins';

export const categoryIds = customizerList.map((item) => item.id);

const defaultCheckedComponents = {} as Record<string, boolean>;

const defaultCheckedPlugins = customizerList.reduce(
  (acc, item) => {
    item.children.forEach((child) => {
      child.components?.forEach((component) => {
        defaultCheckedComponents[component.id] = true;
      });

      acc[child.id] = true;
    });
    return acc;
  },
  {} as Record<string, boolean>
);

export const getDefaultCheckedPlugins = () => {
  return {
    ...defaultCheckedPlugins,
    [KEY_NORMALIZE_TYPES]: false,
    [KEY_SINGLE_LINE]: false,
    [KEY_SELECT_ON_BACKSPACE]: false,
    list: false,
  } as Record<string, boolean>;
};

export const getDefaultCheckedComponents = () => {
  return {
    ...defaultCheckedComponents,
  } as Record<string, boolean>;
};

export type SettingsStoreValue = {
  showSettings: boolean;
  loadingSettings: boolean;
  showComponents: boolean;
  homeTab: string;
  customizerTab: string;
  valueId: ValueId;
  checkedPluginsNext: Record<string, boolean>;
  checkedPlugins: Record<string, boolean>;
  checkedComponents: Record<string, boolean>;
};

const initialState: SettingsStoreValue = {
  showSettings: false,
  loadingSettings: true,
  showComponents: true,
  homeTab: 'playground',
  // homeTab: 'installation',
  customizerTab: 'plugins',

  valueId: customizerPlugins.playground.id as ValueId,

  checkedPluginsNext: getDefaultCheckedPlugins(),

  checkedPlugins: getDefaultCheckedPlugins(),
  checkedComponents: getDefaultCheckedComponents(),
};

export const settingsStore = createZustandStore('settings')(initialState)
  .extendActions((set) => ({
    resetPlugins: ({
      exclude,
    }: {
      exclude?: string[];
    } = {}) => {
      set.state((draft) => {
        draft.checkedPluginsNext = getDefaultCheckedPlugins();

        exclude?.forEach((item) => {
          draft.checkedPluginsNext[item] = false;
        });
      });
    },
    resetComponents: ({
      exclude,
    }: {
      exclude?: string[];
    } = {}) => {
      set.state((draft) => {
        draft.checkedComponents = getDefaultCheckedComponents();

        exclude?.forEach((item) => {
          draft.checkedComponents[item] = false;
        });
      });
    },
    setCheckedIdNext: (id: string | string[], checked: boolean) => {
      set.state((draft) => {
        draft.checkedPluginsNext = { ...draft.checkedPluginsNext };

        const conflicts =
          (customizerItems[id as string] as SettingPlugin)?.conflicts ?? [];

        conflicts.forEach((item) => {
          if (!draft.checkedPluginsNext[item]) return;

          draft.checkedPluginsNext[item] = false;

          const label = customizerItems[item]?.label;
          if (label) {
            toast(`${label} plugin disabled.`);
          }
        });

        draft.checkedPluginsNext[id as string] = checked;
      });
    },
    setCheckedComponentId: (id: string | string[], checked: boolean) => {
      set.state((draft) => {
        draft.checkedComponents[id as string] = checked;
      });
    },
    syncChecked: () => {
      set.state((draft) => {
        draft.checkedPlugins = { ...draft.checkedPluginsNext };
      });
    },
  }))
  .extendSelectors((get) => ({
    checkedIdNext: (id: string) => get.checkedPluginsNext[id],
    checkedId: (id: string) => get.checkedPlugins[id],
    checkedComponentId: (id: string) => get.checkedComponents[id],
  }));
