# Software Engineering

## What is the difference between an interface and abstract class?

**Abstract Class**

- For an abstract class, a method must be declared as abstract. An abstract method doesn't have an implementation.
- The Abstract methods can be declared with Access modifiers like public, internal, protected, etc. When implementing these methods in a subclass, you must define them with the same (or a less restricted) visibility.
- Abstract classes can contain variables and concrete methods.
- A class can Inherit only one Abstract class. Hence multiple inheritance is not possible for an Abstract class.
- Abstract is object-oriented. It offers the basic data an 'object' should have and/or functions it should be able to do. It is concerned with the object's basic characteristics: what it has and what it can do. Hence objects which inherit from the same abstract class share the basic characteristics (generalization).
- Abstract class establishes "is a" relation with concrete classes.

**Interface**

- For an interface, all the methods are abstract by default. So one cannot declare variables or concrete methods in interfaces.
- All methods declared in an interface must be public.
- Interfaces cannot contain variables and concrete methods except constants.
- A class can implement many interfaces. Hence multiple interface inheritance is possible.
- Interface is functionality-oriented. It defines functionalities an object should have. Regardless what object it is, as long as it can do these functionalities, which are defined in the interface, it's fine. It ignores everything else. An object/class can contain several (groups of) functionalities; hence it is possible for a class to implement multiple interfaces.
- Interface provides "has a" capability for classes.
