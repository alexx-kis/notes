# ПСЕВДОКЛАССЫ ЭЛЕМЕНТОВ

- :first-child{} - выбирает элемент, являющийся первым в родителе

- :last-child{} - выбирает элемент, являющийся последним в родителе

- :nth-child(n/odd/even/expression){} - выбирает элемент, являющийся n-ным/нечётными/чётными в родителе

        :nth-child(n+7):nth-child(-n+14){} - выберет элементы с 7 по 14

- :nth-last-child(n/odd/even/expression){} - выбирает элемент, являющийся n-ным/нечётными/чётными потомком родителя, отсчитывая с конца

- :only-child{} - выбирает элемент, который является единственным потомком родителя

- :empty{} - задаёт, как будет выглядеть пустой элемент

- :nth-of-type(n/odd/even/expression){} - выбирает элемент, который является n-ным/нечётными/чётными потомком родителя заданного типа

- :nth-last-of-type(n/odd/even/expression){} - выбирает элемент, который является n-ным/нечётными/чётными потомком родителя заданного типа, отсчитывая с конца

- :only-of-type(){} - выбирает элемент, который является единственным потомком родителя заданного типа (то есть если в родителе есть только один такой элемент, если в родителе ≥2 элементов определённого типа, то ни один не выберется)

- :not(){} - задаёт отрицание, например p:not(.elem) выберет все абзацы, у которых нет класса .elem

        li:not(:first-child, last-child){} - выберет все элементы списка, кроме первого и последнего