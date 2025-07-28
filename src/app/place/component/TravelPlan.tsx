interface Types {
   id: number,
    title: string,
    childIds: number[]
}
interface Props{
   id: number, parentId: number, placesById: Record<number, Types>, onComplete: (parentId: number, id: number)=>void 
}

export function PlaceTree({ id, parentId, placesById, onComplete }: Props) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}