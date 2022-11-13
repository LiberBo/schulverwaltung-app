import { mount } from '@vue/test-utils'
import WalletPage from '@/views/WalletPage.vue'

describe('WalletPage.vue', () => {
  it('renders Wallet WalletPage', () => {
    const wrapper = mount(WalletPage)
    expect(wrapper.text()).toMatch('Wallet page')
  })
})
