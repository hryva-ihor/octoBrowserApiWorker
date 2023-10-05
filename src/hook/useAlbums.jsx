import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchAlbums } from "../store/todoSlice";
import {
  addNewAlbum,
  deletAlbum,
  getAlbumItemget,
  getAlbumsData,
  updateAlbum,
} from "../services/album-services";
const useAlbums = () => {
  // const dispatch = useDispatch();
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState({});
  const [title, setTitle] = useState("");
  const [subtitle, setSubitle] = useState("");
  const [about, setAbout] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [validURL, setValidURL] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const albumQuery = searchParams.get("album") || ``;
  useEffect(() => {
    // dispatch(fetchAlbums());
    getAlbumsData().then(({ data }) => setAlbums(data.reverse()));
  }, []);

  ///!create album page
  const handlerOnChangeInput = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "subtitle":
        setSubitle(e.target.value);
        break;
      case "about":
        setAbout(e.target.value);
        break;
      case "imgURL":
        setImgURL(e.target.value);
        setValidURL(isImgLink(e.target.value));
        break;
      default:
        alert("something wrong");
    }
  };
  const isImgLink = (url) => {
    return (
      String(url).match(
        /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim
      ) !== null
    );
  };
  const handleSubmitEvent = (e, goBack) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const subtitle = form.subtitle.value;
    const about = form.about.value;
    const imgURL = form.imgURL.value;
    if (subtitle && title && about && validURL) {
      setTitle("");
      setSubitle("");
      setAbout("");
      setImgURL("");
      setValidURL(true);
      const newAlbum = {
        title: title,
        subtitle: subtitle,
        about: about,
        img: imgURL,
      };
      addNewAlbum(newAlbum).then(({ data }) => {
        setAlbums([...albums, data]);
        goBack();
      });
    } else {
      return false;
    }
  };

  ///!create album page
  ///////////////////////////////////////////////
  //!   edit album page
  const getAlbumItem = (id) => {
    getAlbumItemget(id).then(({ data }) => {
      setAlbum(data);
      setTitle(data.title);
      setSubitle(data.subtitle);
      setAbout(data.about);
      setImgURL(data.img);
      setValidURL(true);
    });
  };

  const handlerOnChangeInpitEdit = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "subtitle":
        setSubitle(e.target.value);
        break;
      case "about":
        setAbout(e.target.value);
        break;
      case "imgURL":
        setImgURL(e.target.value);
        setValidURL(isImgLink(e.target.value));
        break;
      default:
        alert("something wrong");
    }
  };
  const handleSubmitEdit = (e, goToAlbumsPage, ID) => {
    if (subtitle && title && about && validURL) {
      e.preventDefault();
      const editAlbum = {
        title: title,
        subtitle: subtitle,
        about: about,
        img: imgURL,
      };
      updateAlbum(editAlbum, ID).then((data) => {
        setAlbums([...albums, data]);
        goToAlbumsPage();
      });
    } else {
      e.preventDefault();
      return false;
    }
  };
  //!   edit album page
  ////////////////////////////////////////
  //! delet album
  const handleDeletAlbum = (id, goAlbumspage) => {
    deletAlbum(id);
    const newAlbumsData = albums.filter((album) => album.id !== id);
    setAlbums(newAlbumsData);
    setTimeout(() => {
      goAlbumspage();
    }, 500);
  };
  //! delet album

  return {
    albums,
    album,
    handlerOnChangeInput,
    handleSubmitEvent,
    title,
    subtitle,
    about,
    imgURL,
    validURL,
    handlerOnChangeInpitEdit,
    handleSubmitEdit,
    getAlbumItem,
    handleDeletAlbum,
  };
};

export default useAlbums;
