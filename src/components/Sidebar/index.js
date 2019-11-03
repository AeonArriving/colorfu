import React from "react";
import fonts from "../../lib/fonts"

export default function(props) {
  const { windowSize, isEdit, handleChangeMode, params, setParams, canvasToPng } = props;
  const panelStyle = {
    position: "absolute",
    width: windowSize.width / 4,
    height: windowSize.height,
    background: "#f0f0f0"
  };

  const buttonStyle = {
    position: "absolute"
  };

  function handleChangeTitle(e) {
    setParams({ ...params, title: e.target.value });
  }

  function handleContentChange(e) {
    setParams({ ...params, content: e.target.value });
  }

  function handleTextColorChange(e) {
    setParams({ ...params, textColor: e.target.value });
  }

  function handleLayoutChange(e){
    setParams({...params, layout: e.target.value})
  }

  function handleDowloadImage(e){
    canvasToPng('wallpaper.png')
  }

  function handleChangeFontFamily(e){
    setParams({...params, fontFamily: e.target.value})
  }

  function handleUploadImage(e) {
    const file = document.getElementById("imageInput").files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageURL = e.target.result;
      setParams({ ...params, imageURL });
    };
    reader.readAsDataURL(file);
  }

  const panel = (
    <div style={panelStyle}>
      <h1>DIY</h1>
      <div>
        标题：
        <input type="text" value={params.title} onChange={handleChangeTitle} />
        <br />
        内容:
        <textarea
          type="text"
          value={params.content}
          onChange={handleContentChange}
        />
        <br />
        字体颜色：
        <input
          type="color"
          value={params.textColor}
          onChange={handleTextColorChange}
        />
        <br />
        <input
          type="file"
          onChange={handleUploadImage}
          accept="image/*"
          id="imageInput"
        />
        <br />
        位置：
        <label>
          <input type="radio" value="left" name="layout" onChange={handleLayoutChange}/>
          左边
        </label>
        <label>
          <input type="radio" value="middle" name="layout" onChange={handleLayoutChange}/>
          中间
        </label>
        <label>
          <input type="radio" value="right" name="layout" onChange={handleLayoutChange}/>
          右边
        </label>
        <br />
        字体
        <select onChange={handleChangeFontFamily}>
          {
            fonts.map((item, index) => <option key={index}>{item.en}</option>)
          }
        </select>
      </div>
      <button onClick={handleDowloadImage}>保存到本地</button>
    </div>
  );

  const button = (
    <div style={buttonStyle}>
      <button onClick={handleChangeMode}>编辑</button>
    </div>
  );

  return <div>{isEdit ? panel : button}</div>;
}
