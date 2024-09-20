import React from 'react'
import Layout from '../components/Layout/Layout.js'

const About = () => {
  return (
    <Layout title = {'About us'}>
    <div className='row contactus'>
        <div className='col-md-6'>

        </div>
        <div className='col-md-4'>
            <p className='text justify mt-2'>
            we’re a destination for quality products,
             exceptional customer service, and a seamless shopping experience.
              Whether you're looking for the latest trends,
              reliable everyday essentials,
              or unique items that inspire, we’ve got you covered.
            </p>
        </div>

    </div>

      
    </Layout>
  );
};

Layout.defaultProps  = {
    title: 'Ecommerce app',
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "VaibhavSingh"
}

export default About
