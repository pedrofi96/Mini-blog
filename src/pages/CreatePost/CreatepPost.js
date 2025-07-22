import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./CreatePost.module.css"
import { useInsertDocument } from "../../hooks/useInsertDocument";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  const [formError, setFormError] = useState("");
  const {insertDocument, response} = useInsertDocument("posts")

  const {user} = useAuthValue()

  const Navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setFormError("")

    //VALIDAR URL DA IMAGEM
    try{
      new URL(image);
    }catch(error){
      setFormError("A imagem precisa ser uma URL.")
    }

    //CRIAR ARRAY DE TAGS
    const tagsArray = tags.split(",").map((tag)=> tag.trim().toLowerCase());
    //CHECAR TODOS OS VALORES
    if (!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos!");
    }
    //verifica se a erro no form antes de enviar os dados para o banco de dados firebase.
     if (formError) return;

    //inserindo dados:
    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdby: user.displayName
    })
    
    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //redirect
    Navigate("/")

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
        {!response.loading && (
          <button type="submit" className="btn">
            Criar Post
          </button>
        )}
        {response.loading && (
          <button type="submit" className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

export default CreatePost;
