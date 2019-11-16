import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions } from "./store";
import styles from "./style.css";
import withStylesHoc from "../../components/withStylesHoc";

const Home = props => {
  useEffect(() => {
    props.getList();
  }, []);

  return (
    <div>
      <h1>hello world</h1>
      <button onClick={() => props.getList()}>click</button>
      <div className={styles.x}>{renderList(props.list)}</div>
    </div>
  );
};

const renderList = list => {
  return list.map(item => {
    return <div key={item.id}>{item.title}</div>;
  });
};

const mapStateToProps = state => ({
  list: state.home.newsList
});

const mapDispatchToProps = dispatch => ({
  getList() {
    dispatch(actions.getNewsList());
  }
});

const ExportHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStylesHoc(Home, styles));

ExportHome.loadData = store => {
  return store.dispatch(actions.getNewsList());
};

export default ExportHome;
