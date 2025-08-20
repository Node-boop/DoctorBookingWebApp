import React from 'react'

const Contact = () => {
  return (
    <div>
      <button className="btn btn-primary"></button>



  <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Page details</legend>

  <label className="label">Title</label>
  <input type="text" className="input" placeholder="My awesome page" />

  <label className="label">Slug</label>
  <input type="text" className="input" placeholder="my-awesome-page" />

  <label className="label">Author</label>
  <input type="text" className="input" placeholder="Name" />
</fieldset>



<div role="tablist" className="tabs tabs-lift">
  <a role="tab" className="tab">Tab 1</a>
  <a role="tab" className="tab tab-active">Tab 2</a>
  <a role="tab" className="tab">Tab 3</a>
</div>
    </div>
  )
}

export default Contact