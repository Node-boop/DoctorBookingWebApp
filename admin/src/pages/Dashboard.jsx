import React from 'react'
import Charts from '../components/Charts.jsx'

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

			<div className="mb-5">
				<p className='text-sm dark:text-white text-center mt-5 font-bold'>Recent activity</p>
				
			</div>

			


			<div id="dashboardStats" className="grid gap-4 justify-center grid-cols-1 lg:grid-cols-4 sm:grid-cols-3">

				<div className="flex flex-col w-[300px] items-start bg-white shadow px-5 py-2 max-sm:w-[90%] dark:bg-slate-950">
					<p className="text-sm text-gray-400">Total profile views</p>
					<p className="text-xl font-bold">3000+</p>
					<p className="text-sm text-gray-400">10% significant drop </p>


					<div>
						
					</div>
					
				</div>

				<div className="flex flex-col w-[300px] items-start bg-white shadow px-5 py-2 max-sm:w-[90%] dark:bg-slate-950">
					<p className="text-sm text-gray-400">Total Bookings this month</p>
					<p className="text-xl font-bold">500+</p>
					<p className="text-sm text-gray-400">15% increase  </p>


					<div>
						
					</div>
					
				</div>

				<div className="flex flex-col w-[300px] items-start bg-white shadow px-5 py-2 max-sm:w-[90%] dark:bg-slate-950">
					<p className="text-sm text-gray-400">Total cancelled appointments</p>
					<p className="text-xl font-bold">1500</p>
					<p className="text-sm text-gray-400">10% significant drop</p>


					<div>
						
					</div>
					
				</div>

				<div className="flex flex-col w-[300px] items-start bg-white shadow px-5 py-2 max-sm:w-[90%] dark:bg-slate-950">
					<p className="text-sm text-gray-400">Total completed appointments</p>
					<p className="text-xl font-bold">105,080</p>
					<p className="text-sm text-gray-400">An improvement from last record</p>


					<div>
						
					</div>
					
				</div>
				
			</div>

			<div className="grid gap-4 grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-5">
				<Charts />
				<Charts />
				<Charts />
				<Charts />
			</div>
			
		</div>
	)
}

export default Dashboard