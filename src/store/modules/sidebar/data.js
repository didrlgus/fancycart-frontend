/* eslint-disable */
// Sidebar Routers
export const menus = [
   // {
   //   path: '/home',
   //   name: "message.home",
   //   icon: "home",
   //   children: null
   // },
   {
      path: '',
      name:"message.categories",
      icon: 'party_mode',
      type: 'mega_menu',
      children: {
         'message.men': [
            {
               path: 'T-shirt',
               children_menus:null,
               name: 'message.tShirt'
            },
            {
               path: 'Shirt',
               children_menus:null,
               name: 'message.shirt'
            },
            {
               path: 'Jeans',
               children_menus:null,
               name: 'message.jean'
            },
            {
               path: 'Jackets',
               children_menus:null,
               name: 'message.jackets'
            },
         ],
         'message.women': [
            {
               path: 'Dresses',
               children_menus:null,
               name: 'message.dresses'
            },
            {
               path: 'Jean',
               children_menus:null,
               name: 'message.jean'
            },
            {
               path: 'Shirt',
               children_menus:null,
               name: 'message.shirt'
            },
            {
               path: 'Jackets',
               children_menus:null,
               name: 'message.jackets'
            },
         ],
         'message.gadgets': [
            {
               path: 'Headphone',
               children_menus:null,
               name: 'message.headphone'
            },
            {
               path: 'Smartphone',
               children_menus:null,
               name: 'message.smartphone'
            },
            {
               path: 'Watch',
               children_menus:null,
               name: 'message.watch'
            },
            {
               path: 'Speaker',
               children_menus:null,
               name: 'message.speaker'
            },
         ],
         'message.accessories': [
            {
					path: 'Laptop',
					children_menus:null,
               name: 'message.laptopAccessories'
            },
            {
               path: 'Belts',
               children_menus:null,
               name: 'message.belts'
            },
            {
               path: 'Jewellery',
               children_menus:null,
               name: 'message.jewellery'
            },
            {
               path: 'Purse',
               children_menus:null,
               name: 'message.purse'
            }
         ]
      }
   },
]


export const adminPanelMenus = [
	{
      path: '/admin-panel/reports',
      name:"message.reports",
      icon: 'poll',
      children:null,
		active: true
   },
   {
      path: '/admin-panel/invoices',
      name:"message.invoices",
      icon: 'recent_actors',
      children:null,
		active: false
   },
   {
      path: '',
      name:"message.products",
      icon: 'shopping_cart',
		active: false,
      children: [
			{
				name: "message.products",
				path: "/admin-panel/products"
			},
			{
				name: "message.productAdd",
				path: "/admin-panel/product-add"
         },
      ]

   },
   {
      path: '/admin-panel/account/profile',
      name:"message.profile",
      icon: 'account_circle',
		active: false,
      children: null
   },
   {
      path: '/home',
      name:"message.goToSite",
      icon: 'home',
		active: false,
      children: null
   },
]
