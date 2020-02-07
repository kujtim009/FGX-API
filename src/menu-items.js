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
          url: "/dashboard",
          icon: "feather icon-home"
        },
        {
          id: "cpanel",
          title: "CPanel",
          type: "item",
          url: "/cpanel",
          icon: "feather icon-check"
        }
      ]
    },
    {
      id: "apis",
      title: "FGX DATA",
      type: "group",
      icon: "feather icon-navigation",
      children: [
        {
          id: "api",
          title: "FGX API",
          type: "collapse",
          icon: "feather icon-menu",
          children: [
            {
              id: "mlf",
              title: "MASTER LICENSE FILE",
              type: "collapse",
              children: [
                {
                  id: "LicenseType",
                  title: "Select Type",
                  type: "costum",
                  icon: "feather icon-pie-chart",
                  url: "/charts/nvd3"
                },
                {
                  id: "license",
                  title: "License Number",
                  type: "costumEditBox",
                  url: "/basic/button"
                },
                {
                  id: "state",
                  title: "State",
                  type: "costumStateDropBox",
                  url: "/basic/button"
                },
                {
                  id: "profession",
                  title: "Profession",
                  type: "costumProfDropBox",
                  url: "/basic/button"
                },
                {
                  id: "otherColapse",
                  title: "Other Filters",
                  type: "collapse",
                  icon: "feather icon-box",
                  children: [
                    {
                      id: "zipcode",
                      title: "Zip Code",
                      type: "costumEditBox",
                      url: "/basic/button"
                    },
                    {
                      id: "city",
                      title: "City",
                      type: "costumEditBox",
                      url: "/basic/button"
                    },
                    {
                      id: "county",
                      title: "County",
                      type: "costumEditBox",
                      url: "/basic/button"
                    },
                    {
                      id: "phone",
                      title: "Phone Number",
                      type: "costumEditBox",
                      url: "/basic/button"
                    },
                    {
                      id: "licowner",
                      title: "License Owner Name",
                      type: "costumComboBox",
                      url: "/basic/button"
                    },
                    {
                      id: "companyname",
                      title: "Company Name",
                      type: "costumComboBox",
                      url: "/basic/button"
                    }
                  ]
                },
                {
                  id: "search",
                  title: "Search",
                  type: "costumSrchBtn",
                  url: "/forms/form-basic",
                  icon: "feather icon-search"
                }
              ]
            }
          ]
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
