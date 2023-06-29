import { Button, Input, Menu, Popover } from "antd";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout, logoutidc, stateGlobal } from "../../Reducer/GlobalReducer/GlobalReducer";
import { ConfirmationNumberOutlined, LogoutOutlined, Person, ShoppingCartOutlined } from "@mui/icons-material";
import { setDefaultAdress } from "../../Reducer/ProductReducer/ProductReducer";
import { useEffect } from "react";


export default function Header() {
  const { userInfo } = useSelector(stateGlobal);
  const dispatch = useDispatch();
  let history = useHistory();

  function handleClick() {
    let data = new FormData();
    data.append("accountId", userInfo.id);
    data.append("cartSelected", 0);
    dispatch(logoutidc(data));
    dispatch(setDefaultAdress())
  }

  useEffect(() => {
    console.log(userInfo.position === "1")
  }, [])
  const { Search } = Input;
  const menuProps = (
    <div>
      <Menu>
        <Menu.Item
          icon=<Person />
          key="profile"
          onClick={() => {
            history.push("/Profile");
          }}
        >
          Thông tin tài khoản
        </Menu.Item>
        <Menu.Item
          icon=<ShoppingCartOutlined />
          key="bill"
          onClick={() => {
            history.push("/Bill");
          }}
        >
          Đơn mua
        </Menu.Item>

        {
          userInfo.position === "1" ? (
            <Menu.Item
              icon=<ConfirmationNumberOutlined />
              key="confirm"
              onClick={() => { history.push("/ConfirmCart") }}>
              Xác nhận đơn hàng
            </Menu.Item>
          ) : (<></>)
        }


        <Menu.Item
          icon=<LogoutOutlined />
          key="logout"
          onClick={handleClick}>
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
            <nav>
              <Button
                type="link"
                onClick={() => {
                  history.push("/");
                }}
                style={{
                  width: 100,
                  padding: 0,
                  float: "left",
                  marginRight: 30,
                }}
              >
                <div className="web-laptop-logo-home"></div>
              </Button>

              <ul className="web-laptop-choose">
                <li>
                  <a href="https://www.facebook.com/minhvu.147" target="blank">
                    <div>
                      <span class="material-icons md-light">
                        info
                      </span>
                    </div>
                    <span className="text-white">Liên hệ</span>
                  </a>
                </li>
                <li>
                  <Link to="/Cart">
                    <div>
                      <span class="material-icons md-light">
                        shopping_cart
                      </span>
                    </div>
                    <span className="text-white">Giỏ hàng</span>
                  </Link>
                </li>
                {_.isEmpty(userInfo) ? (
                  <>
                    <li>
                      <Link to="/Login">
                        <div>
                          <span class="material-icons md-light">
                            account_circle
                          </span>
                        </div>
                        <span className="text-white">Đăng nhập</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Signin">
                        <div>
                          <span class="material-icons md-light">
                            account_circle
                          </span>
                        </div>
                        <span className="text-white">Đăng ký</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Popover content={menuProps}>
                      <Link to="/Profile">
                        <div>
                          <span class="material-icons md-light">
                            account_circle
                          </span>
                        </div>
                        <span style={{ color: 'white' }}>{userInfo.use_name}</span>
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
                    style={{
                      width: 500,
                      height: 40,
                    }}
                  />
                </form>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
