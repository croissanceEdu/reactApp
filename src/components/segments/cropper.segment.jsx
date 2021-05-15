import { useEffect, useRef, useState } from "react";

import Cropper from "react-easy-crop";

import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { Cancel as CancelIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import getCroppedImg from "../../utils/cropImage";
import dataURLtoFile from "../../utils/dataURLtoFile";

import { toast } from "react-toastify";
import axios from "axios";
import { isAuth } from "../../helpers/auth";

const useStyles = makeStyles({
  IconButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    zIndex: "100",
  },
  cancelIcon: {
    color: "#00a3c8",
    fontSize: "50px",
    "&:hover": {
      color: "#f5a3c8",
    },
  },
});
const CropperSegment = (props) => {
  const classes = useStyles();
  const inputRef = useRef();
  useEffect(() => {
    if (!image) triggerFileSelectPopup();
  }, []);
  const triggerFileSelectPopup = () => inputRef.current.click();

  const [image, setImage] = useState(null);

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
        <IconButton
          className={classes.IconButton}
          onClick={() => {
            props.handleCropper();
          }}
        >
          <CancelIcon className={classes.cancelIcon} />
        </IconButton>

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
          <Button
            variant="contained"
            color="primary"
            onClick={handleClear}
            style={{ marginRight: "10px" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={triggerFileSelectPopup}
            style={{ marginRight: "10px" }}
          >
            Choose
          </Button>

          <Button variant="contained" color="secondary" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropperSegment;
