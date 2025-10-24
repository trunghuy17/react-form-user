import type { IMetadata } from '../App';
import type { IUser } from '../types/type';
import Table from './Table'
import clsx from 'clsx'

interface UserListProps {
  dataSource: IUser[],
  metadata: IMetadata | null,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  onPrevPage: () => void,
  onNextPage: () => void
}

const LIMIT = 5;

function UserList({ dataSource, handleEdit, handleDelete, metadata, onPrevPage, onNextPage }: UserListProps) {
  const page = metadata ? metadata.page : 0; // 2
  const paginations = Math.ceil((metadata?.total || 0) / LIMIT);
  const lists = Array.from({ length: paginations }, (_, i) => i + 1);

  const users = dataSource.slice((page - 1) * LIMIT, page * LIMIT); // page: 1 -> .slice(0, 5); page: 2 -> .slice(5, 10), .slice(10, 20)

  console.log('users: ', users)

  return (
    <>
      <Table 
        tableHeaders={['Id', 'Full Name', 'Email Address', 'Address', 'City', 'Country', 'State', 'Action']}
        dataSource={users || []}
        renderRow={(data: IUser) => {
          return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data._id}
              </th>
              <td className="px-6 py-4">{data.first_name}</td>              
              <td className="px-6 py-4">{data.email}</td>
              <td className="px-6 py-4">{data.address}</td>
              <td className="px-6 py-4">{data.city}</td>
              <td className="px-6 py-4">{data.country}</td>
              <td className="px-6 py-4">{data.state}</td>
              <td className="px-6 py-4">
                <button 
                  type="button" 
                  className="underline cursor-pointer mr-2"
                  onClick={() => handleEdit(data._id)}
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  className="underline cursor-pointer text-red-500"
                  onClick={() => handleDelete(data._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        }}
      />
      <br />
      <nav aria-label="Page navigation example" className='text-right mb-2'>
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={onPrevPage}
            >
              Previous
            </button>
          </li>
          {lists.map((item) => (
            <li key={item}>
              <button
                className={clsx(
                  "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                   item === page && 'text-red-500'
                )}
              >
                {item}
              </button>
            </li>
          ))}
          <li>
            <button
              className={clsx(
                "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                page === lists.length && 'disabled'
              )}
              onClick={page === lists.length ? () => {}: () => onNextPage()}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default UserList