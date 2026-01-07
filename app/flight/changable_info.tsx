export default function DisplayChangable({tag, display, classes} : { tag: string, display: string, classes?: string}) {
    return (
      <div className='flex justify-between bg-gray-200 rounded-md px-4 py-6 mb-5'>
        <div>{tag}</div><div className={`text-right ${classes}`}>{display}</div>
      </div>
    )
  }