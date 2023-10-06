import React from "react";
import imgJ from '../assets/imagem/jogador.png'
export default function AtletaFavorito({listaF,SetListaF}){
     
     function desfavoritar(index){
          const listaAux=[...listaF]
          listaAux.splice(index,1)
          SetListaF(listaAux)
     }
     return(
         
          <>
               <section className="caixaq"> 
                    <h4>Favoritos ({listaF.length}) </h4>
               </section>
             {listaF.length<1
               ?

                    <div className="caixainf">
                         <img src={imgJ} alt="lisra vazia" />
                         <p id="alerta">Adicione um jogador a lista de Favorito</p>
                    </div>
               :
               <div className="caixaCard">
               {Object.values(listaF).map((el,index)=>(
               <section className="caixaF" key={index}>
                         <div className="cardJF" key={index}>
                              <div className="imgj" style={{background:"#daa520"}}>
                                   <img src={(el.imagem)=="" ? imgJ : el.imagem} alt="sem imagem do jogador"/>
                              </div>
                              <div className="dadosJ">
                                   <h2 id='jf'>{el.nome}</h2>
                                   <p > Time: {(el.time)==''?'Time não definido':el.time}</p>
                                   <p >idade:{el.idade}</p>
                                   <p>Posição:{(el.posicao)=="Forwards"?"Atacante":(el.posicao)=="Midfielder"?"Meio-Campo":(el.posicao)=="Goalkeeper"?'Goleiro':'Zagueiro'} </p>
                                   <p>Numero camisa:{(el.numero)==''?'numero não definido':el.numero}</p>
                                   <p>Pais:{(el.pais)==''?'pais não definido':el.pais}</p>
                         
                              </div>
                              <div className="caixaB">
                                   <button onClick={()=>desfavoritar(index)} className="btnS">Desfavorita</button>
                              </div>
                         </div>
                    
               </section>    
                    
               ))}
               </div>
             }
          </>
     )
}