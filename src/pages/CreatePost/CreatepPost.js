import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./CreatePost.module.css"

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) =>{
    e.preventDefault();
    setFormError("")



  }
  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>Titulo</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um titulo..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label htmlFor="">
          <span>Imagem URL</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira o URL da imagem aqui"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label htmlFor="">
          <span>Conteúdo</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label htmlFor="">
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por virgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!loading && (
          <button type="submit" className="btn">
            Criar Post
          </button>
        )}
        {loading && (
          <button type="submit" className="btn" disabled>
            Aguarde...
          </button>
        )}
        
      </form>
    </div>
  );
}

export default CreatePost;
