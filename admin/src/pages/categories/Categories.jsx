import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategory,
  addCategory,
  deleteCategory,
  editCategory,
  setCurrentCategory,
} from "../../redux/reduxSlice/categorySlice";
import {
  selectChildCategories,
  selectTopLevelCategories,
  selectCurrentCategory,
} from "../../selectors/categorySelector";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryCard from "../../components/card/category/CategoryCard";
import CategoryModal from "../../components/modal/category/CategoryModal";
import ConfirmModal from "../../components/modal/confirm/ConfirmModal";
import "./Categories.less";

const Categories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [query, setQuery] = useState('');

  const [categoryToBeEdit, setCategoryToBeEdit] = useState(null);
  const dispatch = useDispatch();
  const currentCategory = useSelector(selectCurrentCategory);
  const topLevelCategories = useSelector(selectTopLevelCategories);
  const childCategories = useSelector(selectChildCategories);

  const category = currentCategory ? childCategories : topLevelCategories;

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const onCategoryClick = (category) => {
    dispatch(setCurrentCategory(category));
  };

  const onAddClick = () => {
    setOpenModal(true);
  };

  const onDeleteClick = (item) => {
    setConfirmModal(true);
    setDeleteItem(item);
  };

  const onEditClick = (item) => {
    setCategoryToBeEdit(item);
    setOpenModal(true);
  };

  const handleCategorySave = (name) => {
    if (!categoryToBeEdit) {
      dispatch(
        addCategory({
          name,
          parentId: !!currentCategory ? currentCategory.id : null,
        })
      );
    } else {
      dispatch(editCategory({ name, id: categoryToBeEdit.id }));
      setCategoryToBeEdit(null);
    }
  };

  const handleOnModalClose = () => {
    setOpenModal(false);
    setCategoryToBeEdit(null);
  };

  const handleOnConfirmModalClose = () => {
    setConfirmModal(false);
  };

  const onBackButton = () => {
    dispatch(setCurrentCategory());
  };

  const handleOnDelete = () => {
    setConfirmModal(false);
    dispatch(deleteCategory(deleteItem));
  };

  const searchCategoryByName = (category) => {
    if (query == '') {
      return category;
    }
    if (category.name.toLowerCase().includes(query.toLowerCase())) {
      return category;
    }
  };

  return (
    <div style={{ margin: "0 auto" }}>
    <div className="Categories">
      <div className="header">
        Category
      </div>
      <div onClick={() => onBackButton()}>
        {currentCategory ? <div className="circleBackButton">
          <ArrowBackIcon sx={{ fontSize: 24, cursor: "pointer" }} />
        </div> : ""}
      </div>
      <div>{currentCategory?.title}</div>
      <div className="addButton">
      <input type="text" className="search" placeholder="Search category"
          onChange={e => setQuery(e.target.value)} />
        <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddClick}>
          ADD CATEGORY
        </Button>
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ width: "25%" }}>Name</div>
        <div style={{ width: "25%" }}>SubItemsCount</div>
      </div>
      {!!category &&
        category.filter((val) => searchCategoryByName(val)).map((item) => {
          return (
            <CategoryCard
              key={item.id}
              title={item.name}
              id={item.id}
              subItemsLength={!!item.sub ? item.sub.length : 0}
              onDeleteClick={() => onDeleteClick(item)}
              onEditClick={() => onEditClick(item)}
              onCategoryClick={() => onCategoryClick(item)}
            />
          );
        })}

      {openModal && <CategoryModal
        active={openModal}
        onSave={handleCategorySave}
        onClose={handleOnModalClose}
        editCategory={categoryToBeEdit}
      />}

      {confirmModal && <ConfirmModal
        active={confirmModal}
        onClose={handleOnConfirmModalClose}
        onDelete={handleOnDelete}
      >
        <p>Are you sure you want to delete this category?</p>
      </ConfirmModal>}
    </div>
    </div>
  );
};

export default Categories;
