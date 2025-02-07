/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import React, {useEffect, useState} from 'react';

import {
  defaultTheme,
  Provider,
  ListView,
  Item,
  Text,
  Heading,
  Content,
  Breadcrumbs,
  ActionButton,
  Flex,
  Picker as RSPicker,
  View,
  IllustratedMessage
} from '@adobe/react-spectrum';
import Folder from '@spectrum-icons/illustrations/Folder';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import Error from '@spectrum-icons/illustrations/Error';
import Copy from '@spectrum-icons/workflow/Copy';
import Settings from '@spectrum-icons/workflow/Settings';
import Refresh from "@spectrum-icons/workflow/Refresh";
import queryCache from './api/query.cache';

const Picker = props => {
  const { environments, defaultEnvironment, personalisationCategories } = props;

  const [state, setState] = useState({
    configs: {},
    selectedEnvironment: defaultEnvironment,
    personalisationCategories: personalisationCategories,
    items: personalisationCategories,
    selectedCategory: null,
    loadingState: 'idle',
    showSettings: false,
    error: null,
  });

  const clickListItem = (key) => {
    if (!key.startsWith('category')) {
      copyToClipboard(key);
      return;
    }

    let selected = key.split(':')[1];
    const categoryInitializer = getCategory(selected).initializer;
    if (categoryInitializer && categoryInitializer instanceof Function) {
      state.selectedCategory = selected;
      categoryInitializer(state.selectedEnvironment)
        .then(response => {
          setState(state => ({
            ...state,
            items: response,
            loadingState: 'idle',
          }));
        });
    }

    setState(state => ({
      ...state,
      loadingState: 'idle',
    }));
  }

  const resetSelection = () => {
    setState(state => ({
      ...state,
      selectedCategory: null,
      items: state.personalisationCategories,
      loadingState: 'idle',
    }));
  }

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key ?? '');
  };

  const toggleSettings = () => {
    setState(state => ({
      ...state,
      showSettings: !state.showSettings,
    }));
  }

  const changeSelectedEnvironment = (environment) => {
    clearCache();
    setState(state => ({
      ...state,
      selectedEnvironment: environment,
      selectedCategory: null,
      items: personalisationCategories,
      loadingState: 'idle',
    }));
  }

  const clearCache = () => {
    Object.keys(queryCache).map(key => queryCache[key] = []);
    setState(state => ({
      ...state,
      selectedCategory: null,
      items: state.personalisationCategories,
    }));
  }

  const getCategory = (selected) => {
    return personalisationCategories.find(category => category.key === selected);
  }

  const renderEmptyState = () => (
    <IllustratedMessage>
      <NotFound/>
      <Heading>No items found</Heading>
    </IllustratedMessage>
  );

  if (state.error) {
    return <Provider theme={defaultTheme} height="100%">
      <Flex direction="column" height="100%">
        <View padding="size-500">
          <IllustratedMessage>
            <Error/>
            <Heading>Something went wrong</Heading>
            <Content>{state.error}</Content>
          </IllustratedMessage>
        </View>
      </Flex>
    </Provider>;
  }

  /**
   * Render component
   */
  return <Provider theme={defaultTheme} height="100%">
    <Flex direction="column" height="100%">
      {
        state.showSettings &&
        <View padding="size-100">
          <RSPicker label="Configuration"
                    isRequired
                    width="100%"
                    selectedKey={state.selectedEnvironment}
                    onSelectionChange={environment => changeSelectedEnvironment(environment)}>
            {environments.map(environment => (<Item key={environment} value={environment}>{environment}</Item>))}
          </RSPicker>
        </View>
      }

      <View padding="size-100">
        <Flex direction="row" gap="size-100">
          <ActionButton aria-label="Settings" isQuiet onPress={toggleSettings}>
            <Settings/>
          </ActionButton>
          <ActionButton aria-label="Refresh" isQuiet onPress={clearCache} title="Clear cache">
            <Refresh/>
          </ActionButton>
        </Flex>
      </View>

      <Breadcrumbs onAction={resetSelection}>
        <Item key='Personalisation'>Personalisation</Item>
        {state.selectedCategory &&
          <Item key={getCategory(state.selectedCategory).key}>{getCategory(state.selectedCategory).title}</Item>
        }
      </Breadcrumbs>

      <ListView aria-label="Personalisation"
                items={state.items}
                loadingState={state.loadingState}
                width="100%"
                height="100%"
                density="spacious"
                onAction={clickListItem}
                renderEmptyState={renderEmptyState}
      >
        {item => {
          if (item.title) {
            return <Item key={'category:' + item.key} textValue={item.title}>
              <Folder/>
              <Text>{item.title}</Text>
            </Item>
          }

          return (
            <Item key={item.name}>
              <Text>{item.name}</Text>
              <ActionButton aria-label="Copy" onPress={() => copyToClipboard(item.name)}><Copy/></ActionButton>
            </Item>
          );
        }}
      </ListView>
    </Flex>
  </Provider>;
}

export default Picker;
