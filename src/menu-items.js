export default {
  items: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard/default",
          icon: "feather icon-home"
        }
      ]
    },
    {
      id: "licenseType",
      title: "License Type",
      type: "group",
      icon: "icon-charts",
      children: [
        {
          id: "basic",
          title: "Select License Type",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "LicenseType",
              title: "Select Type",
              type: "costum",
              icon: "feather icon-pie-chart",
              url: "/charts/nvd3"
            }
          ]
        }
      ]
    },
    {
      id: "License",
      title: "License",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "LicenseNumber",
          title: "License Number",
          type: "costumEditBox",
          url: "/basic/button"
        }
      ]
    },
    {
      id: "state_profession",
      title: "State & Profession",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "state",
          title: "State",
          type: "costumDropBox",
          url: "/basic/button"
        },
        {
          id: "profession",
          title: "Profession",
          type: "costumDropBox",
          url: "/basic/button"
        }
      ]
    },
    {
      id: "other",
      title: "Other Filters",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "otherColapse",
          title: "Other Filters",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "zip",
              title: "Zip Code",
              type: "costumEditBox",
              url: "/basic/button"
            },
            {
              id: "City",
              title: "City",
              type: "costumEditBox",
              url: "/basic/button"
            },
            {
              id: "County",
              title: "County",
              type: "costumEditBox",
              url: "/basic/button"
            },
            {
              id: "Phone",
              title: "Phone Number",
              type: "costumEditBox",
              url: "/basic/button"
            },
            {
              id: "licOwnerName",
              title: "License Owner Name",
              type: "costumComboBox",
              url: "/basic/button"
            },
            {
              id: "CompanyName",
              title: "Company Name",
              type: "costumComboBox",
              url: "/basic/button"
            }
          ]
        }
      ]
    },
    {
      id: "getData",
      title: "Get Data",
      type: "group",
      icon: "feather icon-search",
      children: [
        {
          id: "search",
          title: "Search",
          type: "costumSrchBtn",
          url: "/forms/form-basic",
          icon: "feather icon-search"
        }
      ]
    },
    {
      id: "pages",
      title: "Pages",
      type: "group",
      icon: "icon-pages",
      children: [
        {
          id: "auth",
          title: "Authentication",
          type: "collapse",
          icon: "feather icon-lock",
          badge: {
            title: "New",
            type: "label-danger"
          },
          children: [
            {
              id: "signup-1",
              title: "Sign up",
              type: "item",
              url: "/auth/signup-1",
              target: true,
              breadcrumbs: false
            },
            {
              id: "signin-1",
              title: "Sign in",
              type: "item",
              url: "/auth/signin-1",
              target: true,
              breadcrumbs: false
            }
          ]
        },

        {
          id: "sample-page",
          title: "Sample Page",
          type: "item",
          url: "/sample-page",
          classes: "nav-item",
          icon: "feather icon-sidebar"
        },
        {
          id: "docs",
          title: "Documentation",
          type: "item",
          url: "/docs",
          classes: "nav-item",
          icon: "feather icon-help-circle"
        },
        {
          id: "menu-level",
          title: "Menu Levels",
          type: "collapse",
          icon: "feather icon-menu",
          children: [
            {
              id: "menu-level-1.1",
              title: "Menu Level 1.1",
              type: "item",
              url: "#!"
            },
            {
              id: "menu-level-1.2",
              title: "Menu Level 2.2",
              type: "collapse",
              children: [
                {
                  id: "menu-level-2.1",
                  title: "Menu Level 2.1",
                  type: "item",
                  url: "#"
                },
                {
                  id: "menu-level-2.2",
                  title: "Menu Level 2.2",
                  type: "collapse",
                  children: [
                    {
                      id: "menu-level-3.1",
                      title: "Menu Level 3.1",
                      type: "item",
                      url: "#"
                    },
                    {
                      id: "menu-level-3.2",
                      title: "Menu Level 3.2",
                      type: "item",
                      url: "#"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "disabled-menu",
          title: "Disabled Menu",
          type: "item",
          url: "#",
          classes: "nav-item disabled",
          icon: "feather icon-power"
        }
        /*{
                    id: 'buy-now',
                    title: 'Buy Now',
                    type: 'item',
                    icon: 'feather icon-user',
                    classes: 'nav-item',
                    url: 'https://codedthemes.com',
                    target: true,
                    external: true,
                    badge: {
                        title: 'v1.0',
                        type: 'label-primary'
                    }
                }*/
      ]
    }
  ]
};
