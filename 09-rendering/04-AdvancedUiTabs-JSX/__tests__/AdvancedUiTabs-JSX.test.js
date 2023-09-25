const { mount } = require('@vue/test-utils');
const { default: UiTabs } = require(global.getSolutionPath('components/UiTabs'));
const { default: UiTab } = require(global.getSolutionPath('components/UiTab'));
const { h } = require('vue');

function mountTabs(activeTab) {
  const wrapper = mount(UiTabs, {
    props: {
      active: activeTab,
    },
    attrs: {
      'onUpdate:active': (active) => wrapper.setProps({ active }),
    },
    slots: {
      default: () => [
        h(UiTab, { name: 'name-of-tab-1', title: 'title-of-tab-1' }, { default: () => h('div', 'Content-Of-Tab-1') }),
        h(UiTab, { name: 'name-of-tab-2', title: 'title-of-tab-2' }, { default: () => h('div', 'Content-Of-Tab-2') }),
        h(UiTab, { name: 'name-of-tab-3', title: 'title-of-tab-3' }, { default: () => h('div', 'Content-Of-Tab-3') }),
        h(UiTab, { name: 'name-of-tab-4', title: 'title-of-tab-4' }, { default: () => h('div', 'Content-Of-Tab-4') }),
      ],
    },
  });
  return wrapper;
}

describe('rendering/AdvancedUiTabs-JSX', () => {
  describe('UiTabs', () => {
    it('UiTabs должен рендерить элементы переключения вкладок в сооветствии с параметрами переданных UiTab', async () => {
      const wrapper = mountTabs('name-of-tabs-1');
      const tabs = wrapper.findAll('.tabs__tab');
      expect(tabs).toHaveLength(4);
      expect(tabs.map((tab) => tab.text())).toEqual([
        'title-of-tab-1',
        'title-of-tab-2',
        'title-of-tab-3',
        'title-of-tab-4',
      ]);
    });

    it('UiTabs должен выделять активную вкладку c .tabs__tab_active', async () => {
      const wrapper = mountTabs('name-of-tab-3');
      const tabs = wrapper.findAll('.tabs__tab');
      expect(tabs[0].classes('tabs__tab_active')).toBeFalsy();
      expect(tabs[1].classes('tabs__tab_active')).toBeFalsy();
      expect(tabs[2].classes('tabs__tab_active')).toBeTruthy();
      expect(tabs[3].classes('tabs__tab_active')).toBeFalsy();
    });

    it('UiTabs должен рендерить контент активной вкладки', async () => {
      const wrapper = mountTabs('name-of-tab-2');
      const content = wrapper.findAll('.tabs__content');
      expect(content).toHaveLength(1);
      expect(content[0].element.innerHTML).toBe('<div>Content-Of-Tab-2</div>');
    });

    it('UiTabs должен порождать событие обновления active после клика на вкладку с name этой вкладки', async () => {
      const wrapper = mountTabs('name-of-tab-2');
      const tabs = wrapper.findAll('.tabs__tab');
      await tabs[2].trigger('click');
      expect(wrapper.emitted('update:active')).toBeDefined();
      expect(wrapper.emitted('update:active')).toHaveLength(1);
      expect(wrapper.emitted('update:active')[0]).toEqual(['name-of-tab-3']);
    });

    it('UiTabs должен выводить контент новой вкладки при обновлении активной вкладки', async () => {
      const wrapper = mountTabs('name-of-tab-2');
      await wrapper.setProps({ active: 'name-of-tab-1' });
      const tabs = wrapper.findAll('.tabs__tab');
      // tab1 is active
      expect(tabs[0].classes('tabs__tab_active')).toBeTruthy();
      expect(tabs[1].classes('tabs__tab_active')).toBeFalsy();
      expect(tabs[2].classes('tabs__tab_active')).toBeFalsy();
      expect(tabs[3].classes('tabs__tab_active')).toBeFalsy();
      // content of tab1
      const content = wrapper.find('.tabs__content');
      expect(content.element.innerHTML).toBe('<div>Content-Of-Tab-1</div>');
    });
  });
});
