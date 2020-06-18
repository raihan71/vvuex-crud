import Vue from 'vue'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'
import VueMaterial from 'vue-material'
import Notifications from '@/components/NotificationPlugin'
import { shallowMount, createLocalVue  } from '@vue/test-utils'

const localVue = createLocalVue()

localVue.use(Vuex);

describe('Home.vue', () => {
  let actions
  let store

  beforeEach(() => {
    Vue.use(VueMaterial);
    Vue.use(Notifications)
    actions = {
      getUsers: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn()
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it('render Home instance', () => {
    const wrapper = shallowMount(Home, {
      store,localVue
    });
    expect(wrapper.exists()).toBe(true);
    expect(actions.getUsers.mock.calls).toHaveLength(1);
  });

  it('handle add user', () => {
    const wrapper = shallowMount(Home, {
      store, localVue
    });
    wrapper.vm.handleAddUser({user:'testing'});
    expect(actions.createUser).toHaveBeenCalled();
  });

  it('handle update user', () => {
    const wrapper = shallowMount(Home, {
      store, localVue
    });
    wrapper.vm.handleUpdateUser({user:'test'});
    expect(wrapper.exists()).toBe(true);
    expect(actions.updateUser).toHaveBeenCalled();
  });

  it('handle delete user', () => {
    const wrapper = shallowMount(Home, {
      store, localVue
    });
    wrapper.vm.handleDeleteUser({user:'test'});
    expect(wrapper.exists()).toBe(true);
    expect(actions.deleteUser).toHaveBeenCalled();
  });
});