import { useEffect, useRef, useState } from "react";

import Cropper from "react-easy-crop";

import Slider from "@material-ui/core/Slider";

import {
  Close as CancelIcon,
  // Cancel as CancelIcon,
  CloudUpload,
  Edit,
  Save,
} from "@material-ui/icons";

import getCroppedImg from "../../utils/cropImage";
import dataURLtoFile from "../../utils/dataURLtoFile";

import { toast } from "react-toastify";
import axios from "axios";
import { isAuth } from "../../helpers/auth";
import Api from "../../helpers/content-api";

const CropperSegment = (props) => {
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (!image) triggerFileSelectPopup();
  }, [image]);
  const triggerFileSelectPopup = () => {
    inputRef.current.click();
  };

  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      //console.log(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const handleUpload = async () => {
    if (!image) {
      toast.warning("No image selected");
    } else {
      const canvas = await getCroppedImg(image, croppedArea);
      const canvasDataUrl = canvas.toDataURL("image/jpeg");
      const convertedFile = dataURLtoFile(canvasDataUrl, "cropped-image.jpeg");
      //console.log(convertedFile);
      // //console.log(image);

      const formData = new FormData();
      formData.append("croppedImage", convertedFile, convertedFile.name);

      if (formData) {
        axios
          .post(
            `${process.env.REACT_APP_SERVER_URL}/user/updatepic/` +
              isAuth()._id,
            formData
          )
          .then((response) => {
            toast.success(response.data.message);
            props.setProfilePicture(
              `${process.env.REACT_APP_SERVER_URL}/${response.data.imagePath}`
            );
            props.handleCropper();
            window.location = Api.getNavLinkPath("profilePage");
          })
          .catch((err) => {
            if (err.response) toast.error(err.response.data.error);
            else toast.error("Something went wrong");
          });
      } else toast.error("Something went wrong!");
    }
  };
  const handleClear = () => {
    if (!image) {
      toast.warning("No image selected");
    } else setImage(null);
  };
  return (
    <div className="profile-popup">
      <div className="container">
        <button
          className="close-button"
          onClick={() => {
            props.handleCropper();
          }}
        >
          <CancelIcon />
        </button>

        <div className="container-cropper">
          {image ? (
            <>
              <div className="cropper">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className="slider">
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
            </>
          ) : null}
        </div>

        <div className="container-buttons">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />

          <button
            className="edit-button"
            onClick={triggerFileSelectPopup}
            style={{ marginRight: "10px" }}
          >
            <Edit />
          </button>

          <button className="save-button" onClick={handleUpload}>
            <Save />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropperSegment;
