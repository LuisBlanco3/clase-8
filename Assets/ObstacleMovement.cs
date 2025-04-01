using UnityEngine;

public class ObstacleMovement : MonoBehaviour
{
    public float speed = 2f;
    private Vector2 direction;

    void Start()
    {
        direction = new Vector2(Random.Range(-1f, 1f), Random.Range(-1f, 1f)).normalized;
    }

    void Update()
    {
        transform.position += (Vector3)direction * speed * Time.deltaTime;

        if (transform.position.x < -9 || transform.position.x > 9)
            direction.x *= -1;
        if (transform.position.y < -5 || transform.position.y > 5)
            direction.y *= -1;
    }
}
