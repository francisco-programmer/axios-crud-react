import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
 
const Table = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const url = 'https://api-express-mysql-production.up.railway.app/blogs/'
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState('')
    const [blogs, setBlog] = useState([])

    //objeto body para crear y editar los blogs
    const body = {
        title: title,
        content: content
    }
      
      useEffect( ()=>{
          getBlogs()
          console.log(blogs);
      },[])
  
      //procedimineto para mostrar todos los blogs
          const getBlogs = async () => {
          const res =  await axios.get(url)
          setBlog(res.data)
      }

      //funcion para crear blogs en la base de datos
      const crearBlog = async() => {
        await axios.post(url, body)        
        getBlogs()
        setTitle("")
        setContent("")
      }
  
      // para eliminar un blog
      const deleteBlog = async (id) => {
         await axios.delete(`${url}${id}`)
         getBlogs()
      }

      //abrir modal
      const modal =  (id, title, content) => {
       setShowModal(true)
       setTitle(title)
       setContent(content)
       setId(id)
      
      }

      //editar blog
      const editBlog = async () => {       
        await axios.put(`${url}${id}`, body);
        
        getBlogs()     
        setTitle("")
        setContent("")
        setShowModal(false)
                
      }
     
  return (
    <div>
      <div className="mx-auto text-center w-80">
        <div>
          <input
            type="text"
            className="p-2 border-sky-500 border-1"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
          className=""
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div><button className="bg-green-500 p-2 rounded text-white font-bold my-4" onClick={() => crearBlog()}>Guardar</button></div>
      </div>

      <div className="text-center ">
      <table className="table-auto sm:w-1/2 w-full mx-auto text-center border-2">
        <thead>
          <tr className="bg-sky-500">
            <th>title</th>
            <th>content</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>
                  <button onClick={() => modal(item.id, item.title, item.content)} className="text-sky-500 p-2">
                    <FiEdit />
                  </button>
                  <button className="text-red-500 p-2" onClick={() => deleteBlog(item.id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      {/* modal para editar los registros */}
      <>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Editar
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value) } />
                    <input type="text" value={content} onChange={(e)=>setContent(e.target.value) }  />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={() => editBlog()}
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}</>
      
    </div>
  );
}

export default Table