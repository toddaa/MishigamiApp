import React, { createContext, useContext, useState, useEffect } from 'react'
import { useBoolVariation } from '@launchdarkly/react-native-client-sdk'

const TabContext = createContext()

export const TabProvider = ({ children }) => {
  const settingsFlag = useBoolVariation('settings', false)
  const messageFlag = useBoolVariation('message', false)

  useEffect(() => {
    setTabOrder(tabOrder.map(t => {
      return {
        ...t,
        visible: t.name === 'settings' ? settingsFlag : t.visible
      }
    }))
  }, [settingsFlag])

  useEffect(() => {
    setTabOrder(tabOrder.map(t => {
      return {
        ...t,
        visible: t.name === 'message' ? messageFlag : t.visible
      }
    }))
  }, [messageFlag])

  const [tabOrder, setTabOrder] = useState([
    { name: 'index', title: 'Home', visible: true },
    { name: 'calendar', title: 'Calendar', visible: true },
    { name: 'News', title: 'News', visible: true },
    { name: 'map', title: 'Map', visible: false },
    { name: 'tradingPost', title: 'Trading Post', visible: false },
    { name: 'settings', title: 'Settings', visible: settingsFlag },
    { name: 'message', title: 'message', visible: messageFlag },
    // { name: 'TabBarSettings', title: 'TabBarSettings', visible: false },
    // { name: 'AppPreferencesSettings', title: 'App Preferences', visible: false },
    // { name: 'AccountSettings', title: 'Account Settings', visible: false },
    // { name: 'NotificationsSettings', title: 'Notifications', visible: false },
  ])

  const toggleTabVisibility = (name) => {
    setTabOrder(prevOrder =>
      prevOrder.map(tab =>
        tab.name === name ? { ...tab, visible: !tab.visible } : tab
      )
    )
  }

  const updateTabOrder = (newOrder) => {
    setTabOrder(newOrder)
  }

  return (
    <TabContext.Provider value={{ tabOrder, toggleTabVisibility, updateTabOrder }}>
      {children}
    </TabContext.Provider>
  )
}

export const useTabContext = () => useContext(TabContext)
