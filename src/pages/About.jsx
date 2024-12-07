import { Card } from 'konsta/react'
import { Github } from 'lucide-react'
import React from 'react'

const About = () => {
  return (
    <div className='px-1'>
      <Card raised header="About" >
                Hi, This App is created by Iamvkr. I am an aspiring app and web developer crafting products and solutions.
                <br />
                <br />
                Need a similar product or solutions?<br/> Contact me via <a href="mailto:beecoder260@proton.me" className='underline'>mail</a>.
                <br />
                <br />
                Know More: <br /><a href="https://github.com/iamvkr" target='_blank' className='underline flex gap-x-1 items-center' >Github <Github className='h-4 w-4'/></a>
            </Card>
    </div>
  )
}

export default About