import React from 'react'

const Dashboard = () => {
	return (
		<div className='px-5 dark:text-white ' id='dashboard'>
			

			<div className="flex items-center justify-center lg:hidden">
				<form className='w-full max-w-[450px] flex items-start justify-between px-2 border-2 border-gray-300 rounded-4xl'>
				<label>
					<input className="w-full px-5 py-2 rounded-4xl outline-none text-sm  dark:text-white " type="text" role="search" placeholder="Search"/>
				</label>
				

				<button  className="py-2 cursor-pointer border-l-2 border-gray-300 px-3"><i className="fa fa-search text-gray-300"></i></button>
			</form>
			</div>

			<p className='text-sm dark:text-white text-center mt-5'>Recent activity</p>
			
		</div>
	)
}

export default Dashboard