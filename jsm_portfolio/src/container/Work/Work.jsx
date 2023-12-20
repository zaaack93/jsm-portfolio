import React, { useEffect, useState } from 'react'

import {AiFillEye,AiFillGithub} from 'react-icons/ai'
import { motion } from 'framer-motion'
import { client, urlFor } from '../../client'
import { AppWrap } from '../../wrapper'

import './Work.scss'

const Work = () => {
const [activeFilter,setActiveFilter] = useState('All')
const [animateCard,setAnimateCard] =useState({y:0,opacity:1})
const [works,setWorks] =useState([]) 
const [filterWorks,setFilterWorks] =useState([]) 

const handleWorkFilter = (work) =>{
  setAnimateCard({y:100,opacity:0})
  setActiveFilter(work)
  setTimeout(()=>{
    setAnimateCard({y:0,opacity:1})
    if(work==="All"){
      setFilterWorks(works)
    }
    else{
      setFilterWorks(works.filter((item)=>item.tags[0]===work))
    }
  },500)
}

useEffect(()=> {
  client
    .fetch(
      `*[_type == "works"]`
    )
    .then((data) => {
      console.log(data)
      setWorks(data)
      setFilterWorks(data)
    })
    .catch(console.error);
},[])
  return (
    <>
      <h2 className="head-text">
        My Creative <span>Portfolio</span>
      </h2>
      
      <div className="app__work-filter">
      {['UI/UX','Shopify' ,'React JS','All'].map((work,index)=>(
        <div
          key={index}
          onClick={()=>handleWorkFilter(work)}
          className={`app__work-filter-item app__flex p-text ${activeFilter === work ? 'item-active' : ''}`}
        >
          {work}
        </div>
      ))}

      </div>
      <motion.div
        animate={animateCard}
        transition={{duration:0.5,delayChildren:0.5}}
        className='app__work-portfolio'
      >
        {
          filterWorks.map((work,index) => (
            <div className="app__work-item app__flex" key={index}>
              <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.name} />
              
              <motion.div
              whileHover={{opacity:[0,1]}}
              transition={{duration:0.25 ,ease:'easeInOut',staggerChildren:0.5}}
              className='app__work-hover app__flex'
              >
                <a href={work.projectLink} target='_blank' rel="noreferrer">
                <motion.div

                  whileInView={{scale:[0,1]}}
                    whileHover={{scale:[1,0.9]}}
                    transition={{duration:0.25 }}
                    className='app__flex'
                    >
                    <AiFillEye />
                </motion.div>
                </a>

                <a href={work.codeLink} target='_blank' rel="noreferrer">
                <motion.div

                  whileInView={{scale:[0,1]}}
                    whileHover={{scale:[1,0.9]}}
                    transition={{duration:0.25 }}
                    className='app__flex'
                    >
                    <AiFillGithub />
                </motion.div>
                </a>
              </motion.div>
              </div>

              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{marginTop:10}}>{work.description}</p>

                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>
              </div>

            </div>
          ))}
      </motion.div>

    </>
  )
}

export default AppWrap(Work,'work')