import { mount } from '@vue/test-utils';
import Dropdown from './dropdown.vue';

describe('Dropdown', () => {
  it('renders properly', () => {
    const wrapper = mount(Dropdown, {});
    expect(wrapper.text()).toContain('Welcome to Dropdown');
  });
});
