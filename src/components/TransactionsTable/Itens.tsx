interface RepositoryItemProps{
    data: {
        id: number,
        title : string,
        amount : number,
        type : string,
        category : string,
        createdAt : string,
    }
}

export function RepositoryItem(props: RepositoryItemProps) {
    return(
        <tr data-id={props.data.id}>
            <td>{props.data.title}</td>
            <td>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(props.data.amount)}
            </td>
            <td>{props.data.category}</td>
            <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(props.data.createdAt)
                )}
            </td>
        </tr>
    );
}