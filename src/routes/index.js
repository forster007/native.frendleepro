import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Transition } from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import { SignUpStep1, SignUpStep2, SignUpStep3 } from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import ProfileEdit from '~/pages/ProfileEdit';
import About from '~/pages/About';
import TermsUse from '~/pages/TermsUse';
import FAQ from '~/pages/FAQ';

import Chat from '~/pages/Chat';
import Schedule from '~/pages/Schedule';
import Requests from '~/pages/Requests';
import ScheduleDetail from '~/pages/ScheduleDetail';

const SignStack = createStackNavigator(
  {
    SignIn,
    SignUp: createStackNavigator(
      {
        SignUpStep1,
        SignUpStep2,
        SignUpStep3,
      },
      {
        headerMode: 'none',
        initialRouteName: 'SignUpStep1',
      }
    ),
  },
  {
    headerMode: 'none',
    initialRouteName: 'SignIn',
  }
);

const AppTabs = createBottomTabNavigator(
  {
    Schedule,
    Requests,
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#2a3152',
      activeTintColor: '#ffffff',
      inactiveTintColor: '#2a3152',
      style: {
        borderTopWidth: 0,
        height: 54,
        elevation: 5,
      },
      labelStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        top: -15,
      },
    },
  }
);

const AppStack = createStackNavigator(
  {
    AppTabs,
    Profile,
    ProfileEdit,
    About,
    Chat,
    ScheduleDetail,
    FAQ,
    TermsUse,
  },
  {
    headerMode: 'none',
  }
);

export default signed =>
  createAppContainer(
    createAnimatedSwitchNavigator(
      {
        SignStack,
        AppStack,
      },
      {
        initialRouteName: signed ? 'AppStack' : 'SignStack',
        transition: (
          <Transition.Together>
            <Transition.Together>
              <Transition.Out
                type="fade"
                durationMs={200}
                interpolation="easeIn"
              />
              <Transition.In type="fade" delayMs={500} durationMs={300} />
            </Transition.Together>
          </Transition.Together>
        ),
      }
    )
  );
