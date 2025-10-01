import React,{useState,useEffect,useContext} from 'react'
import {useLocation} from 'react-router-dom'
import about_image from '../assets/banner-doctor.svg'

const About = () => {

  const location = useLocation()

  useEffect(()=>{
    document.title = "Medicure | About Us"
  },[location])
  return (
    <div>
      <div className="flex w-full min-h-screen">

         <div className='w-1/2'>

         <picture>
          <img src={about_image} alt="" />
         </picture>
          
      
        </div>

         <div className='w-1/2 mt-3'>
         <div className='items-center justify-start'>
          <p className='dark:text-white'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga ab, aperiam totam voluptatibus reiciendis repudiandae quasi quam autem facilis quisquam at obcaecati voluptas, mollitia, alias assumenda praesentium animi! Laudantium cum suscipit libero molestias minima blanditiis quia, deserunt nam quidem sequi cupiditate nisi nemo quis quos inventore ducimus beatae perspiciatis, fugiat, vero doloremque laborum aliquam. Eum nulla distinctio ab nemo perspiciatis non accusantium, quasi corrupti sapiente, fuga possimus facilis quam. Ab expedita reprehenderit dolores, praesentium deleniti nihil cumque quia saepe cupiditate, sit officiis ipsum perferendis nostrum eos voluptas ut ipsam dolorem quisquam nisi suscipit. Perferendis nihil delectus temporibus animi itaque, magni sequi praesentium tempore molestiae, commodi minus! Sunt ipsa corrupti error aliquam veniam sequi vero qui necessitatibus cum, perferendis voluptates tempore eligendi. Quam a mollitia repellat, temporibus assumenda facilis voluptates veritatis. Eligendi officia totam voluptate quisquam? Doloribus minima modi maxime repellat quia totam, dicta rerum aspernatur tempora? A doloremque architecto perferendis accusantium quidem mollitia quas! Itaque doloribus saepe inventore. Officia, doloremque hic repellendus nam, totam consequuntur facilis praesentium consectetur vel odio sapiente laboriosam? Minus fugiat aspernatur quae, laboriosam laudantium deleniti incidunt eligendi ipsam, fuga nulla temporibus doloremque voluptas molestiae excepturi ad tempore aperiam illo inventore, aut dolorem nihil eum. Nihil, vitae.</p>

         </div>
      
        </div>
                
      </div>
    </div>
  )
}

export default About