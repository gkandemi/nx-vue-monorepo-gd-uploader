import { mount } from '@vue/test-utils';
import Dropzone from './dropzone.vue';

describe('Dropzone', () => {
  it('renders properly', () => {
    const wrapper = mount(Dropzone, {});
    expect(wrapper.text()).toContain('Welcome to Dropzone');
  });
});
