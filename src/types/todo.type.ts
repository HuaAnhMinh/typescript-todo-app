interface ITodo {
  title: string;
  description?: string;
  isFinished: boolean;
  deadline: number;
}

export default function isTodo(object: any): object is ITodo {
  return 'title' in object && 'isFinished' in object && 'deadline' in object &&
    typeof object.title === 'string' && typeof object.isFinished === 'boolean' && typeof object.deadline === 'number';
}