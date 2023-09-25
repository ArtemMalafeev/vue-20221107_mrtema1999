const { mount } = require('@vue/test-utils');
const { h } = require('vue');
const { default: UiPanes } = require(global.getSolutionPath('components/UiPanes'));

function mountPanes(count) {
  return mount(UiPanes, {
    slots: {
      default: () => Array.from(Array(count), (_, i) => h('span', { 'data-test-index': i }, 'Pane' + i)),
    },
  });
}

function findButtonByText(wrapper, text) {
  return wrapper.findAll('button').find((button) => button.text().match(new RegExp(text)));
}

describe('rendering/UiPanes-JSX', () => {
  describe('UiPanes', () => {
    it('UiPanes должен рендерить элементы содержимого в .pane > .pane__content', () => {
      const wrapper = mountPanes(5);
      const panes = wrapper.findAll('.pane');
      expect(panes).toHaveLength(5);
      for (let i = 0; i < panes.length; i += 1) {
        expect(panes[i].find('.pane__content').text()).toBe('Pane' + i);
      }
    });

    it('UiPanes должен рендерить кнопки Up и Down в .pane > .pane__controls', () => {
      const wrapper = mountPanes(5);
      const panes = wrapper.findAll('.pane');
      for (let i = 0; i < panes.length; i += 1) {
        const up = findButtonByText(panes[i], 'Up');
        const down = findButtonByText(panes[i], 'Down');
        expect(up).toBeTruthy();
        expect(down).toBeTruthy();
      }
    });

    it('UiPanes должен скрывать первую Up и последнюю Down кнопку с классом .pane__disabled-button', () => {
      const wrapper = mountPanes(5);
      const panes = wrapper.findAll('.pane');
      for (let i = 0; i < panes.length; i += 1) {
        const up = findButtonByText(panes[i], 'Up');
        const down = findButtonByText(panes[i], 'Down');
        if (i === 0) {
          expect(up.classes('pane__disabled-button')).toBeTruthy();
          expect(down.classes('pane__disabled-button')).toBeFalsy();
        } else if (i === panes.length - 1) {
          expect(up.classes('pane__disabled-button')).toBeFalsy();
          expect(down.classes('pane__disabled-button')).toBeTruthy();
        } else {
          expect(up.classes('pane__disabled-button')).toBeFalsy();
          expect(down.classes('pane__disabled-button')).toBeFalsy();
        }
      }
    });

    it('UiPanes должен перемещать pane на 1 элемент вверх в списке pane по клику на кнопку Up', async () => {
      const wrapper = mountPanes(5);
      await findButtonByText(wrapper.findAll('.pane')[4], 'Up').trigger('click');
      await findButtonByText(wrapper.findAll('.pane')[3], 'Up').trigger('click');
      await findButtonByText(wrapper.findAll('.pane')[2], 'Up').trigger('click');
      const panes = wrapper.findAll('.pane');
      const newPanes = [0, 4, 1, 2, 3];
      for (let i = 0; i < panes.length; i += 1) {
        expect(panes[i].find('.pane__content').text()).toBe('Pane' + newPanes[i]);
      }
    });

    it('UiPanes должен перемещать pane на 1 элемент вниз в списке pane по клику на кнопку Down', async () => {
      const wrapper = mountPanes(5);
      await findButtonByText(wrapper.findAll('.pane')[1], 'Down').trigger('click');
      await findButtonByText(wrapper.findAll('.pane')[2], 'Down').trigger('click');
      const panes = wrapper.findAll('.pane');
      const newPanes = [0, 2, 3, 1, 4];
      for (let i = 0; i < panes.length; i += 1) {
        expect(panes[i].find('.pane__content').text()).toBe('Pane' + newPanes[i]);
      }
    });
  });
});
