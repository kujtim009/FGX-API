import React from "react";
import Aux from "../../../../../../hoc/_Aux";
import NavCollapse from "./../NavCollapse";
import NavItem from "./../NavItem";
import LicenseType from "./../../Filters/LicenseType/LicenseType";
import CostumEditBox from "./../../Filters/CostumEditBox/CostumEditBox";
import CostumStateDropBox from "../../Filters/CostumStateDropBox/CostumStateDropBox";
import CostumProfDropBox from "../../Filters/CostumProfDropBox/CostumProfDropBox";
import CostumComboBox from "./../../Filters/CostumComboBox/CostumComboBox";
import CostumSrchBtn from "./../../Filters/CostumSrchBtn/CostumSrchBtn";
// import CbdStateDropBox from "../../Filters/CbdFilters/CostumStateDropBox/CostumStateDropBox";
import CbdMultiStateDropBox from "../../Filters/CbdFilters/CostumStateDropBox/CostumMultiStateDropBox";
import PrmMultiStateDropBox from "../../Filters/PrmFilters/CostumStateDropBox/CostumMultiStateDropBox";
import CbdCityDropBox from "../../Filters/CbdFilters/CostumCityDropBox/CostumCityDropBox";
import PrmZipDropBox from "../../Filters/PrmFilters/CostumZipDropBox/CostumZipDropBox";
import PrmMultiZipDropBox from "../../Filters/PrmFilters/CostumZipDropBox/CostumMultiZipDropBox";
import CbdPotByerCheckBox from "../../Filters/CbdFilters/CostumPotByerDropBox/PotByerCheckBox";
import CbdCostumEditBox from "./../../Filters/CbdFilters/CostumEditBox/CostumEditBox";
import CbdPullRandom from "./../../Filters/CbdFilters/CbdPullRandom/CbdPullRandom";
import CostumDoB from "./../../Filters/CbdFilters/DateOfBirth/DateOfBirth";
import CbdCostumSrchBtn from "./../../Filters/CbdFilters/CostumSrchBtn/CostumSrchBtn";

const navGroup = (props) => {
  let navItems = "";
  if (props.group.children) {
    const groups = props.group.children;

    navItems = Object.keys(groups).map((item) => {
      item = groups[item];
      switch (item.type) {
        case "collapse":
          return <NavCollapse key={item.id} collapse={item} type="main" />;

        case "item":
          return <NavItem layout={props.layout} key={item.id} item={item} />;

        case "costum":
          return (
            <LicenseType layout={props.layout} key={item.id} item={item} />
          );

        case "costumEditBox":
          return (
            <CostumEditBox layout={props.layout} key={item.id} item={item} />
          );
        case "costumStateDropBox":
          return (
            <CostumStateDropBox
              layout={props.layout}
              key={item.id}
              item={item}
            />
          );

        case "costumProfDropBox":
          return (
            <CostumProfDropBox
              layout={props.layout}
              key={item.id}
              item={item}
            />
          );
        case "costumComboBox":
          return (
            <CostumComboBox layout={props.layout} key={item.id} item={item} />
          );
        case "costumSrchBtn":
          return (
            <CostumSrchBtn layout={props.layout} key={item.id} item={item} />
          );

        case "cbdStateDropBox":
          return (
            <CbdMultiStateDropBox
              layout={props.layout}
              key={item.id}
              item={item}
            />
          );

        case "CbdCityDropBox":
          return (
            <CbdCityDropBox
              layout={this.props.layout}
              key={item.id}
              item={item}
            />
          );
        case "CbdPotByerType":
          return (
            <CbdPotByerCheckBox
              layout={this.props.layout}
              key={item.id}
              item={item}
            />
          );

        case "CbdcostumEditBox":
          return (
            <CbdCostumEditBox layout={props.layout} key={item.id} item={item} />
          );

        case "CbdDoB":
          return <CostumDoB layout={props.layout} key={item.id} item={item} />;

        case "CbdCostumSrchBtn":
          return (
            <CbdCostumSrchBtn layout={props.layout} key={item.id} item={item} />
          );
        case "CbdRandom":
          return (
            <CbdPullRandom layout={props.layout} key={item.id} item={item} />
          );
        case "prmStateDropBox":
          return (
            <PrmMultiStateDropBox
              layout={props.layout}
              key={item.id}
              item={item}
            />
          );
        // case "prmZipDropBox":
        //   return (
        //     <PrmZipDropBox
        //       layout={this.props.layout}
        //       key={item.id}
        //       item={item}
        //     />
        //   );
        case "prmZipDropBox":
          return (
            <PrmMultiZipDropBox
              layout={this.props.layout}
              key={item.id}
              item={item}
            />
          );

        default:
          return false;
      }
    });
  }

  return (
    <Aux>
      <li key={props.group.id} className="nav-item pcoded-menu-caption">
        <label>{props.group.title}</label>
      </li>
      {navItems}
    </Aux>
  );
};

export default navGroup;
