'use client';
import React, { useState } from 'react'

import Collapse from 'react-bootstrap/Collapse'

import ProtectedRoute from '../../components/ProtectedRoute'
import AdminHeader from '../../components/AdminHeader'
import StatCard from '../../components/StatCard'
import DataTable from '../../components/table/DataTable'
import ModelPerformance from '../../components/ModelPerformance'
import Drift from '../../components/Drift'


const Admin = () => {
  const [openUserManagement, setOpenUserManagement] = useState(false);
  const [openModelsControl, setOpenModelsControl] = useState(false);
  const [openDriftControl, setOpenDriftControl] = useState(false);
  const [openModelPerformance, setOpenModelPerformance] = useState(false);
  const [openDrift, setOpenDrift] = useState(false);


  return (
    <ProtectedRoute>
      <div className='mx-auto flex justify-center items-center h-screen'>
      <AdminHeader/>
      <main>
        <section className="text-gray-600 body-font">
          <h1 className='mb-0'> Welcome 👋  </h1>
          <small className='mt-0'> This is the Admin management portal. As an Admin,
            you can manage users, monitor data drift, see the model performance, and view summarization logs.
          </small>
         </section>

         <section className="d-flex  gap-3 justify-content-between">
           <StatCard
            type="appointments"
            count={6}
            label="User Management"
            icon="/assets/icons/user-group.svg"
            handleClick={() => setOpenUserManagement(!openUserManagement)}
            arialControls='user-management'
            state={openUserManagement}
            />
            {/* </Link> */}
             <StatCard
            type="pending"
            count={11}
            label= "Model Management"
            icon="/assets/icons/logs.svg"
            handleClick={() => setOpenModelsControl(!openModelsControl)}
            arialControls='models-controls'
            state={openModelsControl}
            />
             <StatCard
            type="cancelled"
            count={12}
            label="Monitor Data Drift"
            icon="/assets/icons/drift-2.svg"
            handleClick={() => setOpenDriftControl(!openDriftControl)}
            arialControls='drift-controls'
            state={openDriftControl}
            />
        </section>
        <Collapse in={openUserManagement}>
         <div id="user-management">
          <DataTable
          />
          </div>
        </Collapse>
        <Collapse in={openModelsControl}>
         <div id="models-controls">
          <DataTable
          />
          </div>
        </Collapse>
        <Collapse in={openDriftControl}>
         <div id="drift-controls">
          <div className='d-flex  gap-3 justify-content-between mt-3'>
            <button className="btn btn-style border-radius-1 "
             aria-controls="model-performance"
             aria-expanded={openModelPerformance}
             onClick={() => setOpenModelPerformance(!openModelPerformance)}
            > 
            Model Performance
            </button>
            <button
             className="btn btn-style"
             arial-controls="drift-controls"
             arial-expanded={openDrift}
            onClick={() => setOpenDrift(!openDrift)}         
            > Monitor Drift</button>
          </div>
        </div>
        </Collapse>

        <section>
          {/* For model performance management */}
        <Collapse in={openModelPerformance} dimension="width">
          <div id="model-performance">
               <ModelPerformance/>
          </div>
        </Collapse>

        {/* For drift management */}
        <Collapse in={openDrift} dimension="width">
          <div id="drift-controls">
            <Drift/>
          </div>
        </Collapse>

        </section>

      </main>

      </div>
    </ProtectedRoute>
  )
}

export default Admin