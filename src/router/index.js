import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import RegisterStepOne from '@/components/RegisterStepOne'
import RegisterStepTwo from '@/components/RegisterStepTwo'
import RegisterStepThree from '@/components/RegisterStepThree'
import BoundSuccess from '@/components/BoundSuccess'
import BoundFail from '@/components/BoundFail'
import RecognitionSuccess from '@/components/RecognitionSuccess'
import RecognitionFail from '@/components/RecognitionFail'
import InsufficientAccount from '@/components/InsufficientAccount'
import NetworkError from '@/components/NetworkError'
import Shopping from '@/components/Shopping'
import CheckPlam from '@/components/CheckPlam'
import PhoneVerify from '@/components/PhoneVerify'
import PayFail from '@/components/PayFail'
import PaySuccess from '@/components/PaySuccess'
import Paying from '@/components/Paying'
import ReChoose from '@/components/ReChoose'
import Welcome from '@/components/Welcome'
import Suspend from '@/components/Suspend'
import Replenish from '@/components/Replenish'
import Order from '@/components/Order'
import OrderSettle from '@/components/OrderSettle'
import Credit from '@/components/Credit'
import OtherUsing from '@/components/OtherUsing'
import DeviceError from '@/components/DeviceError'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/RegisterStepOne',
      name: 'RegisterStepOne',
      component: RegisterStepOne
    },
    {
      path: '/RegisterStepTwo',
      name: 'RegisterStepTwo',
      component: RegisterStepTwo
    },
    {
      path: '/RegisterStepThree',
      name: 'RegisterStepThree',
      component: RegisterStepThree
    }
    ,
    {
      path: '/BoundSuccess',
      name: 'BoundSuccess',
      component: BoundSuccess
    }
    ,
    {
      path: '/BoundFail',
      name: 'BoundFail',
      component: BoundFail
    }
    ,
    {
      path: '/RecognitionSuccess',
      name: 'RecognitionSuccess',
      component: RecognitionSuccess
    }
    ,
    {
      path: '/RecognitionFail',
      name: 'RecognitionFail',
      component: RecognitionFail
    }
    ,
    {
      path: '/InsufficientAccount',
      name: 'InsufficientAccount',
      component: InsufficientAccount
    },
    {
      path: '/NetworkError',
      name: 'NetworkError',
      component: NetworkError
    },
    {
      path: '/Shopping',
      name: 'Shopping',
      component: Shopping
    },
    {
      path: '/CheckPlam',
      name: 'CheckPlam',
      component: CheckPlam
    }
    ,
    {
      path: '/PhoneVerify',
      name: 'PhoneVerify',
      component: PhoneVerify
    }
    ,
    {
      path: '/PayFail',
      name: 'PayFail',
      component: PayFail
    },
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    },
    {
      path: '/Paying',
      name: 'Paying',
      component: Paying
    },
    {
      path: '/ReChoose',
      name: 'ReChoose',
      component: ReChoose
    },
    {
      path: '/Welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/Suspend',
      name: 'Suspend',
      component: Suspend
    },
    {
      path: '/Replenish',
      name: 'Replenish',
      component: Replenish
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/OrderSettle',
      name: 'OrderSettle',
      component: OrderSettle
    },
    {
      path: '/Credit',
      name: 'Credit',
      component: Credit
    },
    {
      path: '/OtherUsing',
      name: 'OtherUsing',
      component: OtherUsing
    },
    {
      path: '/DeviceError',
      name: 'DeviceError',
      component: DeviceError
    }
  ]
})
