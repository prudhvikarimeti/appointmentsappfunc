import React from 'react'
import AppointmentItem from '../AppointmentItem'
import {v4} from 'uuid'
import {format} from 'date-fns'
import { useState } from 'react'
import './index.css'

export default function Appointments() {
    const[titleInput,setTitleInput]=useState('');
    const[dateInput,setDateInput]=useState('');
    const[appointmentsList,setAppointmentList]=useState([]);
    const[isFilterActive,setFilterActive]=useState(false);



    const toggleIsStarred=id=>{
        setAppointmentList(appointmentsList.map(eachAppointment=>{
            if(id===eachAppointment.id){
                return {...eachAppointment, isStarred: !eachAppointment.isStarred}
            }
            return eachAppointment
        }))
    }

    const onFilter=()=>{
        setFilterActive(!isFilterActive)
    }

    const onChangeTitleInput=(searchValue)=>{
setTitleInput(searchValue)
    }

    const onChangeDateInput=(searchValue)=>{
        setDateInput(searchValue)
            }


    const onAddAppointment = event => {
        event.preventDefault()
        const formattedDate = dateInput
                  ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
                  : ''
            
        const newAppointment = {
            id: v4(),
            title: titleInput,
            date: formattedDate,
            isStarred: false,
            }

            setAppointmentList([...appointmentsList, newAppointment])
                setTitleInput('')
                setDateInput('')
                
              }
            

    const getAppointmentsList = () => {
                if (isFilterActive) {
                  return appointmentsList.filter(
                    eachAppointment => eachAppointment.isStarred === true,
                  )
                }
                return appointmentsList
              }
            

const filteredAppointmentsList=getAppointmentsList();

const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'

  return (
    <div className="bg-container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Title"
                  value={titleInput}
                  onChange={(e)=>onChangeTitleInput(e.target.value)}
                  id="title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  className="input"
                  value={dateInput}
                  onChange={(e)=>onChangeDateInput(e.target.value)}
                  id="date"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                onClick={onFilter}
                className={`filter-style${filterClassName}`}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  

