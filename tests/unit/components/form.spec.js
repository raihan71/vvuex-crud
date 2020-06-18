import Vue from 'vue'
import VueMaterial from 'vue-material'
import { shallowMount } from '@vue/test-utils'
import UsersForm from '@/components/Users/Form.vue'

describe('Form.vue', () => {
  let editId = '';
  let isDisabled = false;

  beforeEach(() => {
    Vue.use(VueMaterial);
  });
it('render component without props', () => {
    const wrapper = shallowMount(UsersForm);
    expect(wrapper.exists()).toBe(true);
  });

it('render component with props', () => {
    const wrapper = shallowMount(UsersForm, {
      propsData: {
        editId,
        isDisabled
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

it('render component with props changes', () => {
    editId = 'testing123';
    isDisabled = true;
    const wrapper = shallowMount(UsersForm,{
      propsData: {
        editId,
        isDisabled
      }
    });
    expect(wrapper.vm.editId).toBe('testing123');
    expect(wrapper.vm.isDisabled).toBe(true);
  });
});