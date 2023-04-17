import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  logout,
  stateGlobal,
} from "../../../Reducer/GlobalReducer/GlobalReducer";
import _ from "lodash";
import {Input, Menu, Popover } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


export default function HomePage() {
  const { userInfo } = useSelector(stateGlobal);
  const dispatch = useDispatch();
  let history = useHistory();

  function handleClick() {
    dispatch(logout());
  }
  const { Search } = Input;
  const menuProps = (
    <div>
      <Menu>
        <Menu.Item key="profile" onClick={handleClick}>
          Thông tin tài khoản
        </Menu.Item>
        <Menu.Item key="changepass" onClick={handleClick}>
          Đổi mật khẩu
        </Menu.Item>
        <Menu.Item key="logout" onClick={handleClick}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <div>
      <div className="web-laptop-header">
        <div className="web-laptop-top">
          <div className="web-laptop-nav">
            <div className="web-laptop-nav-logo"></div>
            <ul className="web-laptop-choose">
              <li></li>
              <li></li>
              {_.isEmpty(userInfo) ? (
                <>
                  <li>
                    <Link to="/Login">
                      <div>
                        <AccountCircleIcon color="action" />
                      </div>
                      <span className="text-white">Đăng nhập</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Signin">
                      <div>
                        <AccountCircleIcon color="action" />
                      </div>
                      <span className="text-white">Đăng ký</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Popover content={menuProps}>
                    <Link to="/">
                      <div>
                        <AccountCircleIcon color="action" />
                      </div>
                      <span>{userInfo.use_name}</span>
                    </Link>
                  </Popover>
                </li>
              )}
            </ul>
            <div className="web-laptop-search">
              <form>
                <Search
                  placeholder="Tìm kiếm"
                  allowClear
                  //onSearch={}
                  style={{
                    width: 500,
                    height: 40,
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
