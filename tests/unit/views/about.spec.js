import { shallowMount } from '@vue/test-utils'
import About from '@/views/About.vue'

describe('About.vue', () => {
  it('render About.vue instance', () => {
    const wrapper = shallowMount(About);
    expect(wrapper.exists()).toBeTruthy();
  });
});