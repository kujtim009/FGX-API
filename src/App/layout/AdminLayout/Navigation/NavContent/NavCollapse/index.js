import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Aux from "../../../../../../hoc/_Aux";
import DEMO from "../../../../../../store/constant";
import * as actionTypes from "../../../../../../store/actions";
import NavIcon from "./../NavIcon";
import NavBadge from "./../NavBadge";
import NavItem from "../NavItem";
import LoopNavCollapse from "./index";
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
import PrmCostumEditBox from "./../../Filters/PrmFilters/CostumEditBox/CostumEditBox";
import PrmMultiZipDropBox from "../../Filters/PrmFilters/CostumZipDropBox/CostumMultiZipDropBox";
import PrmMultiStatusDropBox from "../../Filters/PrmFilters/CostumStatusDropBox/CostumMultiStatusDropBox";
import PrmCostumSrchBtn from "./../../Filters/PrmFilters/CostumSrchBtn/CostumSrchBtn";
import CbdPotByerCheckBox from "../../Filters/CbdFilters/CostumPotByerDropBox/PotByerCheckBox";
import CbdCostumEditBox from "./../../Filters/CbdFilters/CostumEditBox/CostumEditBox";
import CbdPullRandom from "./../../Filters/CbdFilters/CbdPullRandom/CbdPullRandom";
import CostumDoB from "./../../Filters/CbdFilters/DateOfBirth/DateOfBirth";
import CbdCostumSrchBtn from "./../../Filters/CbdFilters/CostumSrchBtn/CostumSrchBtn";

class NavCollapse extends Component {
  componentDidMount() {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === this.props.collapse.id);
    if (currentIndex > -1) {
      this.props.onCollapseToggle(this.props.collapse.id, this.props.type);
    }
  }

  checkIfProjectIsAvailable(id) {
    if (this.props.availableProjects) {
      return this.props.availableProjects.some((item) => id === item.id);
    } else {
      return false;
    }
  }
  render() {
    const { isOpen, isTrigger } = this.props;

    let navItems = "";

    if (this.props.collapse.children) {
      const collapses = this.props.collapse.children;
      navItems = Object.keys(collapses).map((item) => {
        item = collapses[item];

        switch (item.type) {
          case "collapse":
            if (item.project) {
              if (this.checkIfProjectIsAvailable(item.id)) {
                return (
                  <LoopNavCollapse key={item.id} collapse={item} type="sub" />
                );
              }
              return null;
            } else {
              return (
                <LoopNavCollapse key={item.id} collapse={item} type="sub" />
              );
            }

          case "item":
            return (
              <NavItem layout={this.props.layout} key={item.id} item={item} />
            );
          case "costum":
            return (
              <LicenseType
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "costumEditBox":
            return (
              <CostumEditBox
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "costumStateDropBox":
            return (
              <CostumStateDropBox
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );

          case "costumProfDropBox":
            return (
              <CostumProfDropBox
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "costumComboBox":
            return (
              <CostumComboBox
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "costumSrchBtn":
            return (
              <CostumSrchBtn
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "cbdStateDropBox":
            return (
              <CbdMultiStateDropBox
                layout={this.props.layout}
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
              <CbdCostumEditBox
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "CbdDoB":
            return (
              <CostumDoB layout={this.props.layout} key={item.id} item={item} />
            );
          case "CbdCostumSrchBtn":
            return (
              <CbdCostumSrchBtn
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "CbdRandom":
            return (
              <CbdPullRandom
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "prmStateDropBox":
            return (
              <PrmMultiStateDropBox
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "prmZipDropBox":
            return (
              <PrmMultiZipDropBox
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );

          case "PrmStatusDropBox":
            return (
              <PrmMultiStatusDropBox
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "PrmCostumEditBox":
            return (
              <PrmCostumEditBox
                layout={this.props.layout}
                key={item.id}
                item={item}
              />
            );
          case "PrmCostumSrchBtn":
            return (
              <PrmCostumSrchBtn
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

    let itemTitle = this.props.collapse.title;
    if (this.props.collapse.icon) {
      itemTitle = (
        <span className="pcoded-mtext">{this.props.collapse.title}</span>
      );
    }

    let navLinkClass = ["nav-link"];

    let navItemClass = ["nav-item", "pcoded-hasmenu"];
    const openIndex = isOpen.findIndex((id) => id === this.props.collapse.id);
    if (openIndex > -1) {
      navItemClass = [...navItemClass, "active"];
      if (this.props.layout !== "horizontal") {
        navLinkClass = [...navLinkClass, "active"];
      }
    }

    const triggerIndex = isTrigger.findIndex(
      (id) => id === this.props.collapse.id
    );
    if (triggerIndex > -1) {
      navItemClass = [...navItemClass, "pcoded-trigger"];
    }

    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === this.props.collapse.id);
    if (currentIndex > -1) {
      navItemClass = [...navItemClass, "active"];
      if (this.props.layout !== "horizontal") {
        navLinkClass = [...navLinkClass, "active"];
      }
    }

    const subContent = (
      <Aux>
        <a
          href={DEMO.BLANK_LINK}
          className={navLinkClass.join(" ")}
          onClick={() =>
            this.props.onCollapseToggle(this.props.collapse.id, this.props.type)
          }>
          <NavIcon items={this.props.collapse} />
          {itemTitle}
          <NavBadge layout={this.props.layout} items={this.props.collapse} />
        </a>
        <ul className="pcoded-submenu">{navItems}</ul>
      </Aux>
    );
    let mainContent = "";
    if (this.props.layout === "horizontal") {
      mainContent = (
        <li
          className={navItemClass.join(" ")}
          onMouseLeave={() =>
            this.props.onNavCollapseLeave(
              this.props.collapse.id,
              this.props.type
            )
          }
          onMouseEnter={() =>
            this.props.onCollapseToggle(this.props.collapse.id, this.props.type)
          }>
          {subContent}
        </li>
      );
    } else {
      mainContent = <li className={navItemClass.join(" ")}>{subContent}</li>;
    }

    return <Aux>{mainContent}</Aux>;
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.mainReducer.layout,
    isOpen: state.mainReducer.isOpen,
    isTrigger: state.mainReducer.isTrigger,
    availableProjects: state.filterReducer.availableProjects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCollapseToggle: (id, type) =>
      dispatch({
        type: actionTypes.COLLAPSE_TOGGLE,
        menu: { id: id, type: type },
      }),
    onNavCollapseLeave: (id, type) =>
      dispatch({
        type: actionTypes.NAV_COLLAPSE_LEAVE,
        menu: { id: id, type: type },
      }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavCollapse)
);
