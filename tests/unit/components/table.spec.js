import Vue from 'vue'
import VueMaterial from 'vue-material'
import { shallowMount } from '@vue/test-utils'
import UsersTable from '@/components/Users/Table.vue'

describe('Table.vue', () => {
  let props = {};
  const user = {};
  beforeEach(() => {
    Vue.use(VueMaterial);
    props = {
    tableHeaderColor: '',
      items: [],
      columns: []
    };
  });

  it('render component without props', () => {
    const wrapper = shallowMount(UsersTable);
    expect(wrapper.exists()).toBe(true);
  });

  it('render component with props', () => {
    const wrapper = shallowMount(UsersTable, {
      propsData: {...props}
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('check emit handle edit', () => {
    const wrapper = shallowMount(UsersTable, {
      propsData: {...props}
    });
    wrapper.vm.handleClickEdit(user);
    expect(wrapper.emitted('edit')).toHaveLength(1);
  });

  it('check emit handle delete', () => {
    const wrapper = shallowMount(UsersTable, {
      props: {...props}
    });
    wrapper.vm.handleClickDelete(user);
    expect(wrapper.emitted('delete')).toHaveLength(1);
  });
});